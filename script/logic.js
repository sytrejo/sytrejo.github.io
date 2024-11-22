window.addEventListener('scroll', function() {
    var header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
  });
  
  function toggleMenu() {
    var menuToggle = document.querySelector('.toggle');
    var menu = document.querySelector('.menu');
    menuToggle.classList.toggle('active');
    menu.classList.toggle('active');
  }
  
  // For the "Work" section
  $("#more").click(function() {
    $('#work .workBx.hidden').removeClass("hidden"); // Only target hidden elements within the #work section
    $('#less').removeClass("hidden"); // Show the "Show Less" button
    $(this).addClass("hidden"); // Hide the "View More" button
  });
  
  $("#less").click(function() {
    $('#work .workBx.showless').addClass("hidden"); // Only target showless elements within the #work section
    $('#more').removeClass("hidden"); // Show the "View More" button
    $(this).addClass("hidden"); // Hide the "Show Less" button
  });
  
  // For the "School Work" section
  $("#more2").click(function() {
    $('#schoolWork .workBx.hidden').removeClass("hidden"); // Only target hidden elements within the #schoolWork section
    $('#less2').removeClass("hidden"); // Show the "Show Less" button
    $(this).addClass("hidden"); // Hide the "View More" button
  });
  
  $("#less2").click(function() {
    $('#schoolWork .workBx.showless').addClass("hidden"); // Only target showless elements within the #schoolWork section
    $('#more2').removeClass("hidden"); // Show the "View More" button
    $(this).addClass("hidden"); // Hide the "Show Less" button
  });