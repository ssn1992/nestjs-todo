// Swagger Export Functionality
window.onload = function() {
  setTimeout(function() {
    const topbar = document.querySelector('.topbar-wrapper .topbar');
    if (topbar && !document.getElementById('export-buttons-added')) {
      // Create Export Collection button
      const exportBtn = document.createElement('button');
      exportBtn.className = 'export-btn';
      exportBtn.innerHTML = '📥 Export OpenAPI JSON';
      exportBtn.style.cssText = 'padding: 8px 16px; background-color: #4990e2; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background-color 0.3s; margin-right: 10px;';
      exportBtn.onmouseover = function() { this.style.backgroundColor = '#357abd'; };
      exportBtn.onmouseout = function() { this.style.backgroundColor = '#4990e2'; };
      exportBtn.onclick = function() {
        window.open('/api-json', '_blank');
      };

      // Create Download for Postman button
      const postmanBtn = document.createElement('button');
      postmanBtn.className = 'export-btn';
      postmanBtn.innerHTML = '📤 Download Collection';
      postmanBtn.style.cssText = 'padding: 8px 16px; background-color: #49a84e; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500; transition: background-color 0.3s;';
      postmanBtn.onmouseover = function() { this.style.backgroundColor = '#3a8640'; };
      postmanBtn.onmouseout = function() { this.style.backgroundColor = '#49a84e'; };
      postmanBtn.onclick = function() {
        fetch('/api-json')
          .then(function(res) { return res.json(); })
          .then(function(data) {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'nestjs-todo-api-collection.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          })
          .catch(function(error) {
            console.error('Error downloading collection:', error);
            alert('Failed to download collection. Please try again.');
          });
      };

      // Create container for buttons
      const btnContainer = document.createElement('div');
      btnContainer.id = 'export-buttons-added';
      btnContainer.style.cssText = 'display: flex; gap: 10px; margin-right: 20px;';
      btnContainer.appendChild(exportBtn);
      btnContainer.appendChild(postmanBtn);

      topbar.appendChild(btnContainer);
    }
  }, 500);
};
