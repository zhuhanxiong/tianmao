;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-icon" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M707.732381 707.721637c-36.031635 0-65.243957 29.208229-65.243957 65.239863s29.212322 65.243957 65.243957 65.243957 65.239863-29.212322 65.239863-65.243957S743.764016 707.721637 707.732381 707.721637L707.732381 707.721637zM394.577149 707.721637c-36.031635 0-65.243957 29.208229-65.243957 65.239863s29.212322 65.243957 65.243957 65.243957c36.030611 0 65.23884-29.212322 65.23884-65.243957S430.60776 707.721637 394.577149 707.721637L394.577149 707.721637zM872.900142 311.197648c-3.281743-5.432733-8.773827-9.78997-16.408715-13.415544-7.706519-3.604084-18.268062-5.431709-32.181957-5.431709L317.653175 292.350394l-4.421706-27.53717-2.929726-21.394263c-1.071402-6.886851-1.782599-12.319583-2.925632-16.300244l-3.637854-12.335956c-1.463328-4.708232-3.997034-9.417487-7.278777-13.766538-3.673669-4.357238-8.41874-7.966439-14.271028-10.868535-5.847172-2.902096-13.873985-4.353145-23.759123-4.353145l-74.881454 0c-11.304464 0-20.086477 3.254114-27.006074 9.417487-6.595208 6.17156-9.881045 14.137998-9.881045 23.923876 0 4.705162 0.747014 10.161431 1.818415 15.945157 1.103124 5.808286 3.641947 11.239995 6.567579 16.320711 3.27765 5.076622 7.343245 9.413394 12.411681 13.043061 4.78498 3.625574 10.988262 5.432733 18.263969 5.432733l55.550177 0 32.142048 163.101705 11.700483 61.97347 10.596336 55.818283 8.382924 41.695634 4.03285 21.008476c1.459235 7.256264 3.673669 14.866592 6.204305 23.200398 2.925632 8.335852 6.211469 15.945157 10.956539 22.829961 4.384867 6.882757 9.881045 12.685927 16.444531 17.044188 6.599302 4.353145 14.982226 6.52767 24.863271 6.52767l387.936403 0c13.910824 0 23.399943-3.629667 27.753087-10.512425 4.780887-6.886851 7.351432-15.233959 7.351432-25.003464 0-1.812275-0.211824-3.437286-0.411369-5.080715L381.525901 642.48075l0-24.656563-0.695848 0-0.24764-1.441838 385.0384 0c22.159696-2.564405 24.334221-35.950793 42.211381-80.132038 11.060917-33.131585 21.662369-65.550948 24.152073-72.821539l17.547655-48.206932 15.697517-44.577265 9.525957-26.825972c1.427512-4.340865 2.174526-9.417487 2.530636-15.581883C877.645213 322.063113 876.181885 316.629357 872.900142 311.197648L872.900142 311.197648z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)