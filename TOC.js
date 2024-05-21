jQuery(document).ready(function($) {
    // Check if in builder mode
    if (window.angular) return;
  
    // TOC setup
    var container = $('#toc-list');
    var headings = $('#div_block-25-125 h2');
    var number = 0;
  
    headings.each(function() {
      if (!$(this).attr('id')) {
        $(this).attr('id', 'toc-item-' + number);
        number++;
      }
      var tocItem = $('<li>').appendTo(container);
      $('<a>').text($(this).text()).attr('href', '#' + $(this).attr('id')).appendTo(tocItem);
    });
  
    // Toggle TOC visibility on mobile
    $('#toggle-toc').on('click', function() {
      $('#toc-list').toggleClass('show');
    });
  
    // Minimize TOC when a link inside is clicked
    $('#toc-list').on('click', 'a', function() {
      $('#toc-list').removeClass('show');
    });
  });
  
  
  // Highlighting the TOC element of the section that is currently scrolled
  document.addEventListener("DOMContentLoaded", function() {
    const headings = document.querySelectorAll('h2'); // Select all h2 headings
    let lastHighlighted = null; // Store the last highlighted TOC link
  
    window.addEventListener('scroll', function() {
      const windowHeight = window.innerHeight;
      let currentVisibleHeading = null; // The current heading visible in the top half
  
      // Determine the last heading entering the top half of the viewport
      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top >= 0 && rect.top <= windowHeight / 2) {
          currentVisibleHeading = heading; // Update the current visible heading
        }
      });
  
      // Update the highlight if a new heading has entered the top half
      if (currentVisibleHeading) {
        const correspondingTocLink = document.querySelector(`a[href="#${currentVisibleHeading.id}"]`);
        if (lastHighlighted !== correspondingTocLink) {
          if (lastHighlighted) {
            lastHighlighted.classList.remove('highlight');
          }
          correspondingTocLink.classList.add('highlight');
          lastHighlighted = correspondingTocLink; // Update the last highlighted link
        }
      } else {
        // Optionally, keep the last highlight active if no new heading has entered
        // This part is based on whether you want the highlight to disappear
        // when no headings are in the top half.
        // Remove the else block if you want the last highlight to remain until a new h2 enters.
      }
    });
  });