$(function () {
  
  var slider = $('.heros__slider');
  slider.slick({
    arrows: true,
    slidesToShow: 3,
    centerMode: true,
    prevArrow: '<div class="slick-prev"><span class="slick-prev__icon"><img class="slick-prev__img" src="images/arrow-left.svg" alt="prev" /></span></div>',
    nextArrow: '<div class="slick-next"><span class="slick-next__icon"><img class="slick-next__img" src="images/arrow-right.svg" alt="prev" /></span></div>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  
  var stat = $('.stat');
  var statList = $('.stat__list');
  var burgerMenuBtn = $('.burger-menu');
  
  function onBurgerBtnClick(){
    
    objBtn = $(this);
    
    stat.addClass('active');
    
  }
  
  function setDisactiveOnbodyClick(event){
    
    if($(event.target).closest(statList).length)
    return(false)
    
    if (!$(event.target).closest(burgerMenuBtn).length)
    stat.removeClass('active');    
    
  }  
  
  burgerMenuBtn.on('click', onBurgerBtnClick);
  
  $(document).on('click', function(event) {
    
    setDisactiveOnbodyClick(event);
  });
  
  /*
  * create clock
  */
  var playBtn = $('.nav__play');
  var targetElement = $('.time');
  var targetText = $('.waiting');
  
  var mm = 0;
  var ss = 0;
  
  function createTimer(){   
    
    ss++;
    
    if(ss < 10)
    ss = '0' + ss;
    
    if(ss == 60){
      mm++;
      ss = 0;
    }
    
    targetElement.text(mm + ':' + ss);    
    
  }
  
  // Update every 1000 ms
  function setTimer(){
    
    var objBtn = $(this);    
    
    if(objBtn.hasClass('timer-on'))
    return(false);
    
    createTimer();
    
    setInterval(createTimer, 1000);
    
    objBtn.addClass('timer-on');
    
    targetText.text('Waiting for your opponent');
    
  }
  
  // call timer
  playBtn.on('click', setTimer);
  
  /*
  * filters dropdown navigation
  */
  var objFilters = $('.nft__filters-item');
  
  function onObjFilterClick(){
    
    var currentFilter = $(this);
    
    if(currentFilter.hasClass('active')){
      objFilters.removeClass('active');
      return(false);
    }
    
    objFilters.removeClass('active');
    
    currentFilter.addClass('active');
    
  }
  
  function setDisactiveFiltersOnbodyClick(event){
    
    if (!$(event.target).closest(objFilters).length)
    objFilters.removeClass('active');    
    
  }  
  
  $(document).on('click', function(event) {
    
    setDisactiveFiltersOnbodyClick(event);
  });
  
  objFilters.on('click', onObjFilterClick);
  
  //scrollbar functionality
  var scrollBar = $('.nft__inner-scrollbar__track');
  var objScrollBarThumb = $('.nft__inner-scrollbar__thumb');
  var objScrollElement = $('.nft__inner');
  var objScrollElementHeight, scrollBarTrackHeight, scrollBarThumbHeight, scrollDistance, objScrollBarThumbHeightPx, scrollIndex;
  /*
  * count scrollbar vars
  */
  function countScrollBarVars(){
    
    objScrollElementHeight = $('.nft__grid').height();
    scrollBarTrackHeight = scrollBar.height();
    scrollBarThumbHeight = (scrollBarTrackHeight / objScrollElementHeight) * 100;
    
    if(objScrollElementHeight <= scrollBarTrackHeight)
    scrollBar.hide();
    
    objScrollBarThumb.css({'height': scrollBarThumbHeight + '%'});


    objScrollBarThumbHeightPx = objScrollBarThumb.height();

    scrollIndex = objScrollBarThumbHeightPx / scrollBarTrackHeight;

  }

  countScrollBarVars();
  
  function onElementScroll(e){
    
    scrollDistance = objScrollElement.scrollTop() * scrollIndex;
    
    if(scrollDistance <= 2)
    scrollDistance = 2;
    
    if(scrollDistance > 2)
    scrollDistance = scrollDistance - 2;
    
    objScrollBarThumb.css({'transform': 'translate(-50%, ' + scrollDistance + 'px)'});
    
  }
  
  objScrollElement.on('scroll', onElementScroll);
  $(window).on('resize', countScrollBarVars);
})