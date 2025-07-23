document.addEventListener('DOMContentLoaded', () => {
  // Inject styles
  const style = document.createElement('style');
  style.textContent = `
    .profile-icon {
      width: 36px;
      height: 36px;
      font-size: 20px;
      border-radius: 50%;
      background: #eee;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      top: 20px;
      right: 20px;
      cursor: pointer;
      border: 1px solid #ccc;
      z-index: 1000;
    }

    .tooltip {
      position: absolute;
      top: 50%;
      left: 110%;
      transform: translateY(-50%);
      background-color: #007BFF;
      color: white;
      padding: 4px 10px;
      font-size: 12px;
      border-radius: 4px;
      white-space: nowrap;
      display: none;
    }

    .profile-icon:hover .tooltip {
      display: block;
    }
  `;
  document.head.appendChild(style);

  // Create the profile icon
  const icon = document.createElement('div');
  icon.className = 'profile-icon';
  icon.innerHTML = '👤';

  // Create the tooltip (Show Details button)
  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  tooltip.textContent = 'Show Details';
  
  // Tooltip reposition logic to prevent overflow
function repositionTooltip() {
  const iconRect = icon.getBoundingClientRect();
  const tooltipRect = tooltip.getBoundingClientRect();
  const rightEdge = iconRect.left + tooltip.offsetWidth / 2;

  if (rightEdge > window.innerWidth) {
    tooltip.style.left = 'auto';
    tooltip.style.right = '0';
    tooltip.style.transform = 'translateX(0)';
  } else {
    tooltip.style.left = '50%';
    tooltip.style.right = 'auto';
    tooltip.style.transform = 'translateX(-50%)';
  }
}

  // Create the details box
  const detailsBox = document.createElement('div');
  detailsBox.className = 'modal';
  detailsBox.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

  const userName = localStorage.getItem('userName') || '—';
  const userAge = localStorage.getItem('userAge') || '—';
  const userGender = localStorage.getItem('userGender') || '—';
  const userEmail = localStorage.getItem('userEmail') || '—';

  detailsBox.innerHTML = `
    <h3>Your Details</h3>
    <p><strong>Name:</strong> ${userName}</p>
    <p><strong>Age:</strong> ${userAge}</p>
    <p><strong>Gender:</strong> ${userGender}</p>
    <p><strong>Email:</strong> ${userEmail}</p>
  `;

  Object.assign(detailsBox.style, {
    position: 'fixed',
    top: '70px',
    right: '20px',
    display: 'none',
    padding: '15px',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
    zIndex: '9999'
  });

  let isHovering = false;
  let hideTimeout;

  tooltip.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    isHovering = true;
    detailsBox.style.display = 'block';
    detailsBox.style.opacity = '1';
    detailsBox.style.transform = 'translateY(0)';
  });

  icon.addEventListener('mouseleave', () => {
    repositionTooltip()
    isHovering = false;
    hideTimeout = setTimeout(() => {
      if (!isHovering) detailsBox.style.display = 'none';
    }, 300);
  });

  detailsBox.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
    isHovering = true;
  });

  detailsBox.addEventListener('mouseleave', () => {
    isHovering = false;
    hideTimeout = setTimeout(() => {
      if (!isHovering) detailsBox.style.display = 'none';
    }, 300);
  });

  tooltip.addEventListener('click', () => {
    detailsBox.style.display = 'block';
  });

  icon.appendChild(tooltip);
  document.body.appendChild(icon);
  document.body.appendChild(detailsBox);
});