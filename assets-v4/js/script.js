$(document).ready(function(){
    // Set Application ID
    // tp.push(["setAid", 'TYdG8Mh7eY']);
    // // Is application in sandbox?
    // tp.push(["setSandbox", false]);
    // // Does application use Piano ID?
    // tp.push(["setUseTinypassAccounts", false]);
    // // Execute when the page is first loaded
    // tp.push(["init", function() {
    //     tp.experience.init();
    // }]);
    // (function(src) {
    //     var a = document.createElement("script");
    //     a.type = "text/javascript";
    //     a.async = true;
    //     a.src = src;
    //     var b = document.getElementsByTagName("script")[0];
    //     b.parentNode.insertBefore(a, b)
    // })("//cdn.piano.io/api/tinypass.min.js");

    
    tp = window.tp || [];
    tp.push(["setUsePianoIdUserProvider", true ]);
    
    tp.push(["init", function() {
        tp.pianoId.show({
            disableSignUp: true,
            displayMode: 'modal',
            screen: 'login',
            containerSelector: '#login-form',
            loggedIn: function(data) {
                console.log('user ', data.user, ' logged in with token', data.token);
            },
            loggedOut: function() {
                console.log('user logged out');
            }
        });
    }]);

    

});







$(document).ready(function(){
    
    var prevScrollpos = window.pageYOffset;
    
    $(this).scroll(function() {
        if ($(this).scrollTop() >  10) {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                $(".header").addClass("header-move");
                $(".header").css("transform", "translateY(0px)");
            } else {
                $(".header").css("transform", "translateY(-100px)");
            }
            prevScrollpos = currentScrollPos;
        }
        prevScrollpos = window.pageYOffset;

    });
    
    const items = document.querySelectorAll(".animate-here");
    const observer = new IntersectionObserver(
        entries => {
        entries.forEach(entry => {
            // entry.target.classList.toggle("animate__animated animate__backInUp", entry.isIntersecting);
            if(entry.isIntersecting) {
                // entry.target.classList.add(entry.target.getAttribute("data-ani"))
                entry.target.classList.add("start-animate")
                observer.unobserve(entry.target)
            }
        })
    },
    {
        threshold: 0.3,
    })

    items.forEach(item=>{
        observer.observe(item);
    });

    $(".back-to-top").click(function () {
        $("html, body").animate({scrollTop: 0}, 100);
    });

    $(".share-btn").click(function(){ 
        var sharetext = $("title").text();
        var shareurl = window.location.href;

        if (navigator.share && typeof sharetext != "undefined" && typeof shareurl != "undefined" && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))) {
            navigator.share({
                title: sharetext,
                text: sharetext,
                url: shareurl
            });
        } else {
            $(this).next(".share-list").toggle();
        }
    }); 
    $(".popup .close-btn").click(function () {
        $(".popup").hide();
    });
    
    var gridCards = $('.picture-grid').children('.card').toArray();
    var gridCardsIndex = 0;
    function changeActivePic() {
        $(".picture-grid .card").removeClass("active")
        if($(".picture-grid .card:nth-child("+gridCardsIndex+")").hasClass("text-box")){
            gridCardsIndex++
        }
        $temp = $(".picture-grid .card:nth-child("+gridCardsIndex+")")
        $temp.addClass("active")
        $(".picture-grid .text-box a").text($temp.find(".card-item").attr("data-title"));
        $(".picture-grid .text-box a").attr("href",$temp.find(".card-item").attr("data-href"));
        gridCardsIndex++;
        if(gridCardsIndex > gridCards.length){
            gridCardsIndex = 0
        }
    }
    let intervalId;
    intervalId = setInterval(changeActivePic, 1000);

    $(".picture-grid .card img").click(function () {
        if (intervalId) {
            clearInterval(intervalId);
        }
        $(".picture-grid .card").removeClass("active")
        $(this).parents(".card").addClass("active")
        $(".picture-grid .text-box a").text($(this).parents(".card-item").attr("data-title"));
        $(".picture-grid .text-box a").attr("href",$(this).parents(".card-item").attr("data-href"));
    });
    $(".big-stories .picture").click(function () {
        $(".big-stories .picture").removeClass("active")
        $(this).addClass("active")
        $("#big-storie-title").text($(this).find("img").attr("data-title"));
        $("#no-of-articles").text($(this).find("img").attr("data-n-o-art"));
        $("#no-of-videos").text($(this).find("img").attr("data-n-o-vdo"));
        if($(this).find("img").attr("data-live-art") === "" || $(this).find("img").attr("data-live-art") === "0"){
            $(".big-stories .info .live-articles").hide();
        }else{
            $(".big-stories .info .live-articles").show();
            $("#live-articles").text($(this).find("img").attr("data-live-art"));
        }
        $("#big-stories-link").attr("href",$(this).find("img").attr("data-url"));
        $("#big-stories-link").attr('class', '').addClass("basic-btn "+$(this).find("img").attr("data-class") );
    });
    $(".accordion .accordion-head").click(function () {
        if($(this).hasClass("open")){
            $(this).removeClass('open')
            $(this).next(".accordion-body").slideUp()
        }
        else{
            $(".accordion-body").slideUp()
            $(".accordion .accordion-head").removeClass('open')
            $(this).next(".accordion-body").slideDown()
            $(this).addClass("open"); 
        }
    });
    $(".word-cloud-svg svg g > g").click(function () {
        var category = $(this).attr("data-name")
        // alert(category)
        generateHtml(category)
        document.getElementById('cloud-popup-title').innerText = category;
        document.getElementById('cloud-popup').style.display = "block";
    });

    

    $(".owl-carousel").owlCarousel({
        margin: 10,
        loop: true,
        autoplay: true,
        nav: false,
        dots: true,  
        stagePadding: 220,
        center: true,
        items:1,
        slideBy:1,
        responsive:{
            0:{
                stagePadding: 0,
            },
            600:{
                stagePadding: 0,
            },
            1000:{
                stagePadding: 0,
            },
            1200:{
                stagePadding: 0,
            },
            1400:{
                stagePadding: 0,
            }
        }
    });
    
});



$(document).mouseup(function(e) 
{
    var container = $(".share-btn");
    if (!container.is(e.target) && container.has(e.target).length === 0) 
    {   
    //    container.hide();
    
    $(".share-list").slideUp();
    }
});

var pageURL = window.location.href;
        
function copyToClipboard() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(pageURL).select();
    document.execCommand("copy");
    $temp.remove();
}
function sendEmail() {
    var subject = "Flashback 2024";
    var emailBody = pageURL;
    document.location = "mailto:?subject="+subject+"&body="+emailBody;
}
function openShareLink(pLink) {
    var popUp = window.open(pLink+pageURL, 'popupwindow', 'scrollbars=yes,width=740,height=400');
    popUp.focus();
    $(".share-list").hide();
    return false;
}


  function loadTable(path) {
    return fetch(path)
      .then(response => response.arrayBuffer()) 
      .then(data => {
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);
        console.log(jsonData)
        return jsonData;
      })
      .catch(error => {
        console.error('Error loading the file:', error);
        throw error; 
      });
  }
  var tableData = []; 
  
  loadTable("./assets-v4/js/most-read.xlsx")
    .then(data => {
      tableData = data; 
    })
    .catch(error => {
      console.error('Failed to load the table:', error);
    });

  function generateHtml(category){
    let trimmedKeyData = [];
    tableData.forEach((row, index) => {
        if(row.ARTICLE_SECTION === category){
            trimmedKeyData.push(row);
        }
    });
    var html = "";
    // var dummyImg = "https://www.thehindu.com/theme/images/th-online/thumbnail-square.svg"
    trimmedKeyData.forEach((row, index) => {
        html +=`<a href="${row.ARTICLE_URL}">
                        <div class="picture">
                            <img src="${row.ARTICLE_IMG}" />
                        </div>
                        <p class="title">${row.ARTICLE_TITLE}</p>
                    </a>`
    });

    $("#cloud-popup .stories").html(html)
  }


// Load html2canvas script dynamically
  // First add this HTML to your page for the preview modal
  $(document).ready(function() {
    const modalHTML = `
    <div id="screenshot-modal" class="screenshot-modal">
        <div class="modal-content">
            <button class="close-btn1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6L18 18" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="preview-container">
                <img id="screenshot-preview" alt="Profile Screenshot">
            </div>
            <div class="action-buttons">
                <button class="icon-btn" id="save-screenshot">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15V16.2C21 17.8802 21 18.7202 20.673 19.362C20.3854 19.9265 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V15M17 10L12 15M12 15L7 10M12 15V3" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Save
                </button>
            </div>
        </div>
    </div>
`;

    // Updated CSS
    const modalCSS = `<style>
            .screenshot-modal {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                z-index: 9999;
                padding: 0;
                overflow: hidden;
            }
 
            .screenshot-modal .modal-content {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 12px;
                padding: 24px;
                width: 90%;
                max-width: 1200px;
                height: 90vh;
                display: flex;
                flex-direction: column;
                gap: 20px;
                overflow: hidden;
            }
 
            .screenshot-modal .preview-container {
                position: relative;
                flex: 1;
                min-height: 0;
                border-radius: 8px;
                background: #f5f5f5;
                overflow: hidden;
            }
 
            .screenshot-modal #screenshot-preview {
                width: 100%;
                height: 100%;
                object-fit: contain;
                display: block;
            }
 
            .screenshot-modal .action-buttons {
                display: flex;
                justify-content: center;
                gap: 16px;
                position: relative;
                flex-shrink: 0;
            }
 
            .screenshot-modal .icon-btn {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 8px 16px;
                border: none;
                border-radius: 6px;
                background: #f0f0f0;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.2s;
            }
 
            .screenshot-modal .icon-btn:hover {
                background: #e0e0e0;
            }
 
            .screenshot-modal .close-btn1 {
                position: absolute;
                right: 3px;
                top: 3px;
                background: none;
                border: none;
                cursor: pointer;
                padding: 4px;
                color: #666;
                z-index: 1;
            }
            .stop-scroll{
                padding-right: 16px;
                width: 100%;
                height: 100%;
                margin: 0;
                overflow: hidden;
                overflow-x: hidden;
                top: 0;
                left: 0;
            }
            /* Mobile Styles */
            @media screen and (max-width: 767px) {
                .screenshot-modal .modal-content {
                    width: 100%;
                    height: 100dvh;
                    border-radius: 0;
                    padding: 16px;
                }
 
                .screenshot-modal .close-btn1 {
                    top: 8px;
                    right: 8px;
                }
 
                .screenshot-modal .action-buttons {
                    padding-bottom: env(safe-area-inset-bottom);
                }
            }
 
            /* Tablet Styles */
            @media screen and (min-width: 768px) and (max-width: 1023px) {
                .screenshot-modal .modal-content {
                    width: 95%;
                    height: 95vh;
                }
            }
 
            /* Landscape Mode */
            @media screen and (orientation: landscape) and (max-height: 600px) {
                .screenshot-modal .modal-content {
                    height: 100vh;
                    width: 100%;
                    border-radius: 0;
                    padding: 12px;
                }
 
                .screenshot-modal .action-buttons {
                    padding: 8px 0;
                }
            }
 
            /* Dark Mode Support */
            @media (prefers-color-scheme: dark) {
                .screenshot-modal .modal-content {
                    background: #1a1a1a;
                    color: #ffffff;
                }
 
                .screenshot-modal .preview-container {
                    background: #2a2a2a;
                }
 
                .screenshot-modal .icon-btn {
                    background: #333333;
                    color: #ffffff;
                }
 
                .screenshot-modal .icon-btn:hover {
                    background: #444444;
                }
 
                .screenshot-modal .close-btn1 {
                    color: #999999;
                }
            }
 
            /* Animation */
            @keyframes modalFadeIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -48%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
 
            .screenshot-modal .modal-content {
                animation: modalFadeIn 0.3s ease-out;
            }
        </style>
    `;

    $('head').append(modalCSS);
    $('body').append(modalHTML);
    // $('head').append(metaTags);

  function loadHtml2Canvas() {
    return new Promise((resolve, reject) => {
        if (window.html2canvas) {
            resolve(window.html2canvas);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        script.onload = () => resolve(window.html2canvas);
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

      // Function to capture profile section
      async function captureProfile() {
        try {
            await loadHtml2Canvas();
            const profileSection = document.querySelector('#capture-picture');
            if (!profileSection) throw new Error('Profile section not found');
    
            // Store current animation states
            const animatedElements = profileSection.querySelectorAll('.animate-here');
            const originalClasses = new Map();
            
            // Temporarily remove animation classes
            animatedElements.forEach(el => {
                originalClasses.set(el, el.className);
                el.classList.remove('animate-here', 'come-up', 'come-left', 'come-right', 'zoom-in');
                // Remove any animation-related inline styles
                el.style.animation = 'none';
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
    
            // Force a reflow to ensure animations are cleared
            void profileSection.offsetHeight;
    
            // Take the screenshot
            const canvas = await html2canvas(profileSection, {
                useCORS: true,
                allowTaint: true,
                scrollX: 0,
                scrollY: -window.scrollY,
                scale: 2,
                backgroundColor: null
            });
    
            // Restore animation classes
            animatedElements.forEach(el => {
                el.className = originalClasses.get(el);
                el.style.removeProperty('animation');
                el.style.removeProperty('opacity');
                el.style.removeProperty('transform');
            });
    
            return canvas.toDataURL('image/png');
        } catch (error) {
            console.error('Screenshot capture failed:', error);
            return null;
        }
    }



    $('.profile .basic-btn').click(async function(e) {
        e.preventDefault();
        
        // Show loading state
        const originalText = $(this).text();
        // $(this).prop('disabled', true);
            $(this).css("opacity", "0");
        // $(this).text('Download');
    
        try {
            const imageUrl = await captureProfile();
            if (!imageUrl) {
                alert('Failed to capture screenshot');
                return;
            }
    
            // Display image in modal
            $("body").addClass("stop-scroll")
            $('#screenshot-preview').attr('src', imageUrl);
            $('#screenshot-modal').fadeIn();
        } catch (error) {
            console.error('Screenshot capture failed:', error);
            alert('Failed to capture screenshot');
        } finally {
            // Reset button state
            // $(this).prop('disabled', false);
            // $(this).text(originalText);
            $(this).css("opacity", "1");
        }
    });


    // Handle save button click
     $('#save-screenshot').click(function() {
        const imgSrc = $('#screenshot-preview').attr('src');
        if (!imgSrc) return;

        const link = document.createElement('a');
        link.download = 'profile-screenshot.png';
        link.href = imgSrc;
        link.click();
    });


    // Toggle share options
       $('#share-screenshot').click(function(e) {
        e.stopPropagation();
        $('#share-options').slideToggle();
    });


    // Handle share option clicks
        $('#share-options li').click(function() {
            const platform = $(this).data('platform');
            const imageUrl = $('#screenshot-preview').attr('src');
            if (!imageUrl || !shareHandlers[platform]) return;
    
            shareHandlers[platform](imageUrl);
            $('#share-options').hide();
        });

    // Close modal
    $('.screenshot-modal .close-btn1, .screenshot-modal').click(function(e) {
        if (e.target === this) {
            $('#screenshot-modal').fadeOut();
            $('#share-options').hide();
            $("body").removeClass("stop-scroll")
            
        }
    });

    // close button

    $('.screenshot-modal .close-btn1').click(function() {
        $('#screenshot-modal').fadeOut();
        $('#share-options').hide();
        $("body").removeClass("stop-scroll")
    });

    // Close share options when clicking outside

    $(document).click(function(e) {
    if (!$(e.target).closest('.share-container').length) {
        $('#share-options').slideUp();
    }

        // window.addEventListener('wheel',  function(event) {
        //     if($("#screenshot-modal").css(("display") == "block"){
        //         event.preventDefault()
        //     }
        // },  { passive: false });
});

// Escape key to close modal
$(document).keydown(function(e) {
    if (e.key === 'Escape') {
        $('#screenshot-modal').fadeOut();
        $('#share-options').hide();
    }
});

});



// Progress bar
function updateProgressBar() {
    const progressBar = document.querySelector('.progress-bar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (window.pageYOffset / totalHeight) * 100;
    progressBar.style.width = progress + '%';
  }
  
  updateProgressBar(); 
  window.addEventListener('scroll', updateProgressBar);
  window.addEventListener('resize', updateProgressBar);
  
  
  
  
  // Progress circle
  var scrollPercentageText = 0;
  function updateProgressCircle() {
    const progressElement = document.querySelector('.progress-circle-bar');
    const scrollToTopElement = document.querySelector('.scroll-to-top');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    let progress = (window.pageYOffset / totalHeight) * 283;
    progress = Math.min(progress, 283);
    progressElement.style.strokeDashoffset = 283 - progress;

    const scrollPosition = window.pageYOffset;
    const scrollPercentage = (scrollPosition / totalHeight) * 100;
    // console.log( Math.round(Math.min(Math.max(scrollPercentage, 0), 100)))
    scrollPercentageText = Math.round(Math.min(Math.max(scrollPercentage, 0), 100))
    $("#scroll-percentage").text(scrollPercentageText+"%")
    
  
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      scrollToTopElement.style.opacity = '1';
    } else {
      scrollToTopElement.style.opacity = '0';
    }
  }
  
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
  
  const scrollToTopElement = document.querySelector('.scroll-to-top');
  scrollToTopElement.addEventListener('click', scrollToTop);
  
  
  updateProgressCircle();
  window.addEventListener('scroll', updateProgressCircle);
  window.addEventListener('resize', updateProgressCircle);