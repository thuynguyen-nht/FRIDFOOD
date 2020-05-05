$(document).ready(() => {
  $(".slick").slick({
    autoplay: true,
    autoplaySpeed: 1000,
    accessibility: true,
    slidesToShow: 4,
    infinite: true,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: true,
          centerMode: true,
          centerPadding: "40px",
          slidesToShow: 1
        }
      }
    ]
  });
});
