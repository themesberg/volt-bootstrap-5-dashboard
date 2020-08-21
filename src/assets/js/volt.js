/*

=========================================================
* Pixel Pro Bootstrap 5 UI Kit
=========================================================

* Product Page: https://themesberg.com/product/ui-kit/pixel-pro-premium-bootstrap-5-ui-kit
* Copyright 2019 Themesberg (https://www.themesberg.com)

* Designed and coded by https://themesberg.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal. Contact us if you want to remove it.

*/

"use strict";
const d = document;
d.addEventListener("DOMContentLoaded", function(event) {

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-primary mr-3',
            cancelButton: 'btn btn-gray'
        },
        buttonsStyling: false
    });

    // options
    const breakpoints = {
        sm: 540,
        md: 720,
        lg: 960,
        xl: 1140
    };

    var preloader = d.querySelector('.preloader');
    if(preloader) {
        setTimeout(function() {
            preloader.classList.add('show');

            setTimeout(function() {
                d.querySelector('.loader-element').classList.add('hide');
            }, 200);
        }, 1000);
    }

    var iconNotifications = d.querySelector('.icon-notifications');
    if(iconNotifications) {
        var unreadNotifications = d.querySelector('.unread-notifications');
        var bellShake = d.querySelector('.bell-shake');
    
        if (iconNotifications.getAttribute('data-unread-notifications') === 'true') {
            unreadNotifications.style.display = 'block';
        } else {
            unreadNotifications.style.display = 'none';
        }
    
        // bell shake
        var shakingInterval = setInterval(function() {
            if (iconNotifications.getAttribute('data-unread-notifications') === 'true') {
                if (bellShake.classList.contains('shaking')) {
                    bellShake.classList.remove('shaking');
                } else {
                    bellShake.classList.add('shaking');
                }
            }
        }, 5000);
    
        iconNotifications.addEventListener('show.bs.dropdown', function () {
            bellShake.setAttribute('data-unread-notifications', false);
            clearInterval(shakingInterval);
            bellShake.classList.remove('shaking');
            unreadNotifications.style.display = 'none';
        });
    }

    [].slice.call(d.querySelectorAll('[data-background]')).map(function(el) {
        el.style.background = 'url(' + el.getAttribute('data-background') + ')';
    });

    [].slice.call(d.querySelectorAll('[data-background-color]')).map(function(el) {
        el.style.background = 'url(' + el.getAttribute('data-background-color') + ')';
    });

    [].slice.call(d.querySelectorAll('[data-color]')).map(function(el) {
        el.style.color = 'url(' + el.getAttribute('data-color') + ')';
    });

    // Tooltips
    var tooltipTriggerList = [].slice.call(d.querySelectorAll('[data-toggle="tooltip"]'))
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl)
    })

    // Popovers
    var popoverTriggerList = [].slice.call(d.querySelectorAll('[data-toggle="popover"]'))
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
    })

    // Datepicker
    var datepickers = [].slice.call(d.querySelectorAll('[data-datepicker]'))
    var datepickersList = datepickers.map(function (el) {
        return new Datepicker(el, {
            buttonClass: 'btn'
          });
    })

    // DataTables
    var dataTableEl = d.getElementById('datatable');
    if(dataTableEl) {
        const dataTableConfig = {
            data,
            filters: {"Job": ["Assistant", "Manager"],
                      "Email": [e => e.endsWith('.edu'), e => e.endsWith('.com')],
                      "Ext.": [e => e > 6000]},
    
            columns: [{ select: 4, type: 'date', format: 'MM/DD/YYYY' }]
        };
        const dataTable = new simpleDatatables.DataTable(dataTableEl, dataTableConfig);
    }

    if(d.querySelector('.input-slider-container')) {
        [].slice.call(d.querySelectorAll('.input-slider-container')).map(function(el) {
            var slider = el.querySelector(':scope .input-slider');
            var sliderId = slider.getAttribute('id');
            var minValue = slider.getAttribute('data-range-value-min');
            var maxValue = slider.getAttribute('data-range-value-max');

            var sliderValue = el.querySelector(':scope .range-slider-value');
            var sliderValueId = sliderValue.getAttribute('id');
            var startValue = sliderValue.getAttribute('data-range-value-low');

            var c = d.getElementById(sliderId),
                id = d.getElementById(sliderValueId);

            noUiSlider.create(c, {
                start: [parseInt(startValue)],
                connect: [true, false],
                //step: 1000,
                range: {
                    'min': [parseInt(minValue)],
                    'max': [parseInt(maxValue)]
                }
            });
        });
    }

    if (d.getElementById('input-slider-range')) {
        var c = d.getElementById("input-slider-range"),
            low = d.getElementById("input-slider-range-value-low"),
            e = d.getElementById("input-slider-range-value-high"),
            f = [d, e];

        noUiSlider.create(c, {
            start: [parseInt(low.getAttribute('data-range-value-low')), parseInt(e.getAttribute('data-range-value-high'))],
            connect: !0,
            tooltips: true,
            range: {
                min: parseInt(c.getAttribute('data-range-value-min')),
                max: parseInt(c.getAttribute('data-range-value-max'))
            }
        }), c.noUiSlider.on("update", function (a, b) {
            f[b].textContent = a[b]
        });
    }

    //Chartist

    if(d.querySelector('.ct-chart-volumes')) {
        //Chart 5
          new Chartist.Line('.ct-chart-volumes', {
            labels: ['Mar 16', 'Apr 16', 'May 16', 'Jun 16', 'Jul 16', 'Aug 16', 'Sept 16'],
            series: [
                [2, 5, 2, 3, 4, 6, 8],
                [5, 6, 5, 8, 12, 32, 28],
                [7, 12, 7, 3, 2, 7, 14],
                [10, 15, 13, 17, 14, 18, 20],
                [16, 18, 18, 20, 20, 20, 23]
            ]
          }, {
            low: 0,
            showArea: false,
            fullWidth: true,
            plugins: [
              Chartist.plugins.tooltip()
            ],
            axisX: {
                // On the x-axis start means top and end means bottom
                position: 'end',
                showGrid: false
            },
            axisY: {
                // On the y-axis start means left and end means right
                showGrid: true,
                showLabel: true,
                labelInterpolationFnc: function(value) {
                    return (value / 1) + 'M';
                }
            }
        });
    }

    if(d.querySelector('.ct-chart-sales-value')) {
        //Chart 5
          new Chartist.Line('.ct-chart-sales-value', {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            series: [
                [0, 10, 30, 40, 80, 60, 100]
            ]
          }, {
            low: 0,
            showArea: true,
            fullWidth: true,
            plugins: [
              Chartist.plugins.tooltip()
            ],
            axisX: {
                // On the x-axis start means top and end means bottom
                position: 'end',
                showGrid: true
            },
            axisY: {
                // On the y-axis start means left and end means right
                showGrid: false,
                showLabel: false,
                labelInterpolationFnc: function(value) {
                    return '$' + (value / 1) + 'k';
                }
            }
        });
    }

    if(d.querySelector('.ct-chart-ranking')) {
        var chart = new Chartist.Bar('.ct-chart-ranking', {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            series: [
              [1, 5, 2, 5, 4, 3],
              [2, 3, 4, 8, 1, 2],
            ]
          }, {
            low: 0,
            showArea: true,
            plugins: [
              Chartist.plugins.tooltip()
            ],
            axisX: {
                // On the x-axis start means top and end means bottom
                position: 'end'
            },
            axisY: {
                // On the y-axis start means left and end means right
                showGrid: false,
                showLabel: false,
                offset: 0
            }
            });
          
          chart.on('draw', function(data) {
            if(data.type === 'line' || data.type === 'area') {
              data.element.animate({
                d: {
                  begin: 2000 * data.index,
                  dur: 2000,
                  from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              });
            }
        });
    }

    if(d.querySelector('.ct-chart-app-ranking')) {
        var chart = new Chartist.Bar('.ct-chart-app-ranking', {
            labels: ['21 Apr', '21 Ap', '22 Ap', '23 Ap', '24 Ap', '25 Ap', '26 Ap'],
            series: [
                [5, 4, 3, 7, 5, 10, 3],
                [2, 2, 1, 5, 3, 4, 2],
                [3, 2, 9, 5, 4, 6, 4]
            ]
          }, {
            low: 0,
            showArea: true,
            plugins: [
              Chartist.plugins.tooltip()
            ],
            axisX: {
                // On the x-axis start means top and end means bottom
                position: 'end'
            },
            axisY: {
                // On the y-axis start means left and end means right
                showGrid: false,
                showLabel: false,
                offset: 0
            }
            });
          
          chart.on('draw', function(data) {
            if(data.type === 'line' || data.type === 'area') {
              data.element.animate({
                d: {
                  begin: 2000 * data.index,
                  dur: 2000,
                  from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              });
            }
        });
    }

    if(d.querySelector('.ct-chart-traffic-source')) {
        var data = {
            series: [70, 20, 10]
          };
          
          var sum = function(a, b) { return a + b };
          
          new Chartist.Pie('.ct-chart-traffic-source', data, {
            labelInterpolationFnc: function(value) {
              return Math.round(value / data.series.reduce(sum) * 100) + '%';
            },            
            low: 0,
            high: 8,
            fullWidth: false,
            showLabel: false,
            plugins: [
              Chartist.plugins.tooltip()
            ],
        });         
    }


    if(d.querySelector('.ct-chart-distribution')) {
        var data = {
            series: [30, 50, 20]
          };
          
          var sum = function(a, b) { return a + b };
          
          new Chartist.Pie('.ct-chart-distribution', data, {
            labelInterpolationFnc: function(value) {
              return Math.round(value / data.series.reduce(sum) * 100) + '%';
            },            
            low: 0,
            high: 8,
            fullWidth: false,
            donut: true,
            donutWidth: 80,
            donutSolid: true,
            startAngle: 270,
            showLabel: true,
            plugins: [
              Chartist.plugins.tooltip()
            ],
        });         
    }

    if(d.querySelector('.ct-chart-traffic-share-2')) {
        var data = {
            series: [30,20, 20, 10,10]
          };
          
          var sum = function(a, b) { return a + b };
          
          new Chartist.Pie('.ct-chart-traffic-share-2', data, {
            labelInterpolationFnc: function(value) {
              return Math.round(value / data.series.reduce(sum) * 100) + '%';
            },            
            low: 0,
            high: 8,
            donut: true,
            donutWidth: 50,
            donutSolid: true,
            fullWidth: false,
            showLabel: false,
            plugins: [
              Chartist.plugins.tooltip()
            ],
        });         
    }

    if(d.querySelector('.ct-chart-traffic-share')) {
        var data = {
            series: [70, 20, 10]
          };
          
          var sum = function(a, b) { return a + b };
          
          new Chartist.Pie('.ct-chart-traffic-share', data, {
            labelInterpolationFnc: function(value) {
              return Math.round(value / data.series.reduce(sum) * 100) + '%';
            },            
            low: 0,
            high: 8,
            donut: true,
            donutWidth: 20,
            donutSolid: true,
            fullWidth: false,
            showLabel: false,
            plugins: [
              Chartist.plugins.tooltip()
            ],
        });         
    }

    if(d.querySelector('.ct-chart-11')) {
        // Create a simple bi-polar bar chart
        var chart = new Chartist.Bar('.ct-chart-11', {
            labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10'],
            series: [
            [1, 2, 4, 8, 6, -2, -1, -4, -6, -2]
            ]
        }, {
            high: 10,
            low: -10,
            plugins: [
                Chartist.plugins.tooltip()
            ],
            axisX: {
            labelInterpolationFnc: function(value, index) {
                return index % 2 === 0 ? value : null;
            }
            }
        });
        
        // Listen for draw events on the bar chart
        chart.on('draw', function(data) {
            // If this draw event is of type bar we can use the data to create additional content
            if(data.type === 'bar') {
            // We use the group element of the current series to append a simple circle with the bar peek coordinates and a circle radius that is depending on the value
            data.group.append(new Chartist.Svg('circle', {
                cx: data.x2,
                cy: data.y2,
                r: Math.abs(Chartist.getMultiValue(data.value)) * 2 + 5
            }, 'ct-slice-pie'));
            }
        });         
    }

    if (d.getElementById('loadOnClick')) {
        d.getElementById('loadOnClick').addEventListener('click', function () {
            var button = this;
            var loadContent = d.getElementById('extraContent');
            var allLoaded = d.getElementById('allLoadedText');
    
            button.classList.add('btn-loading');
            button.setAttribute('disabled', 'true');
    
            setTimeout(function () {
                loadContent.style.display = 'block';
                button.style.display = 'none';
                allLoaded.style.display = 'block';
            }, 1500);
        });
    }

    var scroll = new SmoothScroll('a[href*="#"]', {
        speed: 500,
        speedAsDuration: true
    });

    // Vector Map
    if(d.querySelector('#map')) {
        new svgMap({
            targetElementID: 'map',
            colorMin: '#FCE1C3',
            colorMax: '#F8BD7A',
            flagType: 'emoji',
            data: {
              data: {
                visitors: {
                  name: 'Visitors',
                  format: '{0} visitors',
                  thousandSeparator: ',',
                  thresholdMax: 500000,
                  thresholdMin: 0
                },
                change: {
                  name: 'Change by month',
                  format: '{0} %'
                }
              },
              applyData: 'visitors',
              values: {
                US: {visitors: 272109, change: 4.73},
                CA: {visitors: 160064, change: 11.09},
                DE: {visitors: 120048, change: -2.3},
                GB: {visitors: 110048, change: 3.3},
                FR: {visitors: 100048, change: 1.3},
                ES: {visitors: 90048, change: 1.5},
                JP: {visitors: 56022, change: 3.5},
                IT: {visitors: 48019, change: 1},
                NL: {visitors: 40016, change: 2},
                RU: {visitors: 30016, change: 3.4},
                CN: {visitors: 50016, change: 6},
                IN: {visitors: 140016, change: 2},
                BR: {visitors: 40016, change: 5},
                // ...
              }
            }
        });
    }

    // Dropzone
    if(d.querySelector('myDropzone')) {
        // Dropzone class:
        var myDropzone = new Dropzone("div#myId", { url: "/file/post"});
    }

    // Full Calendar
    var calendarEl = d.getElementById('calendar');
    if (calendarEl) {

        var events = [
            {
                id: 1,
                title: 'Call with Jane',
                start: '2020-11-18',
                end: '2020-11-19',
                className: 'bg-red'
            },
            
            {
                id: 2,
                title: 'Dinner meeting',
                start: '2020-11-21',
                end: '2020-11-22',
                className: 'bg-orange'
            },
            
            {
                id: 3,
                title: 'HackTM conference',
                start: '2020-11-29',
                end: '2020-11-30',
                className: 'bg-green'
            },
            
            {
                id: 4,
                title: 'Meeting with John',
                start: '2020-12-01',
                end: '2020-12-02',
                className: 'bg-blue'
            },
            
            {
                id: 5,
                title: 'Summer Hackaton',
                start: '2020-12-03',
                end: '2020-12-04',
                className: 'bg-purple'
            },
            
            {
                id: 6,
                title: 'Digital event',
                start: '2020-12-07',
                end: '2020-12-09',
                className: 'bg-info'
            },
            
            {
                id: 7,
                title: 'Marketing event',
                start: '2020-12-10',
                end: '2020-12-11',
                className: 'bg-blue'
            },
            
            {
                id: 8,
                title: 'Dinner with Parents',
                start: '2020-12-19',
                end: '2020-12-20',
                className: 'bg-red'
            },
            
            {
                id: 9,
                title: 'Black Friday',
                start: '2020-12-23',
                end: '2020-12-24',
                className: 'bg-yellow'
            },
            
            {
                id: 10,
                title: 'Cyber Week',
                start: '2020-12-02',
                end: '2020-12-03',
                className: 'bg-red'
            }
        ];

        var addNewEventModalEl = d.getElementById('modal-new-event');
        var addNewEventModal = new bootstrap.Modal(addNewEventModalEl);
        var newEventTitleInput = d.getElementById('eventTitle');
        var newEventStartDatepicker = new Datepicker(d.getElementById('dateStart'), { buttonClass: 'btn' });
        var newEventEndDatepicker = new Datepicker(d.getElementById('dateEnd'), { buttonClass: 'btn' });

        var editEventModalEl = d.getElementById('modal-edit-event');
        var editEventModal = new bootstrap.Modal(editEventModalEl);
        var editEventTitleInput = d.getElementById('eventTitleEdit');
        var editEventStartDatepicker = new Datepicker(d.getElementById('dateStartEdit'), { buttonClass: 'btn' });
        var editEventEndDatepicker = new Datepicker(d.getElementById('dateEndEdit'), { buttonClass: 'btn' });

        // current id selection
        var currentId = null;

        var calendar = new FullCalendar.Calendar(calendarEl, {
            selectable: true,
            initialView: 'dayGridMonth',
            themeSystem: 'bootstrap',
            initialDate: '2020-12-01',
            editable: true,
            events: events,
            dateClick: function(d) {
                addNewEventModal.show();
                newEventTitleInput.value = '';
                newEventStartDatepicker.setDate(d.date);
                newEventEndDatepicker.setDate(d.date.setDate(d.date.getDate() + 1));

                addNewEventModalEl.addEventListener('shown.bs.modal', function () {
                    newEventTitleInput.focus();
                });
            },
            eventClick: function(info, element) {
                // set current id
                currentId = info.event.id;
                editEventTitleInput.value = info.event.title;
                editEventStartDatepicker.setDate(info.event.start);
                editEventEndDatepicker.setDate(info.event.end ? info.event.end : info.event.start);

                editEventModal.show();
                editEventModalEl.addEventListener('shown.bs.modal', function () {
                    editEventTitleInput.focus();
                });
            }
        });
        calendar.render();

        d.getElementById('addNewEventForm').addEventListener('submit', function (event) {
            event.preventDefault();
            calendar.addEvent({
                id: Math.random() * 10000, // this should be a unique id from your back-end or API
                title: newEventTitleInput.value,
                start: moment(newEventStartDatepicker.getDate()).format('YYYY-MM-DD'),
                end: moment(newEventEndDatepicker.getDate()).format('YYYY-MM-DD'),
                className: 'bg-blue',
                dragabble: true
            });
            addNewEventModal.hide();
        });

        d.getElementById('editEventForm').addEventListener('submit', function (event) {
            event.preventDefault();
            var editEvent = calendar.getEventById(currentId);
            var startDate = moment(editEventStartDatepicker.getDate()).format('YYYY-MM-DD');
            var endDate = moment(editEventEndDatepicker.getDate()).format('YYYY-MM-DD')

            editEvent.setProp('title', editEventTitleInput.value);
            editEvent.setStart(startDate);
            editEvent.setEnd(endDate);
            editEventModal.hide();
        });

        d.getElementById('deleteEvent').addEventListener('click', function () {
            swalWithBootstrapButtons.fire({
                icon: 'error',
                title: 'Confirm deletion',
                text: 'Are you sure you want to delete this event?',
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: 'No, cancel!',
                }).then(function(result) {
                    if (result.value) {
                    swalWithBootstrapButtons.fire(
                        'Deleted!',
                        'The event has been deleted.',
                        'success'
                    );
                    calendar.getEventById(currentId).remove();
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                    editEventModal.hide();
                    }
                })
        });
    }

    if(d.querySelector('.current-year')){
        d.querySelector('.current-year').textContent = new Date().getFullYear();
    }

    // Glide JS

    if (d.querySelector('.glide')) {
        new Glide('.glide', {
            type: 'carousel',
            startAt: 0,
            perView: 3
          }).mount();
    }

    if (d.querySelector('.glide-testimonials')) {
        new Glide('.glide-testimonials', {
            type: 'carousel',
            startAt: 0,
            perView: 1,
            autoplay: 2000
          }).mount();
    }

    if (d.querySelector('.glide-clients')) {
        new Glide('.glide-clients', {
            type: 'carousel',
            startAt: 0,
            perView: 5,
            autoplay: 2000
          }).mount();
    }

    if (d.querySelector('.glide-news-widget')) {
        new Glide('.glide-news-widget', {
            type: 'carousel',
            startAt: 0,
            perView: 1,
            autoplay: 2000
          }).mount();
    }

    if (d.querySelector('.glide-autoplay')) {
        new Glide('.glide-autoplay', {
            type: 'carousel',
            startAt: 0,
            perView: 3,
            autoplay: 2000
          }).mount();
    }

    /*

    Check out the styles here: https://www.mapbox.com/maps/streets
    To change the style of the map change the mapboxId attribute with the following available styles:

    mapbox/dark-v10, mapbox/light-v10, mapbox/streets-v11, mapbox/outdoors/v-11, mapbox/satellite-streets-v11

    This is based on the URL you can when clicking on the preview link from Mapbox.

    You need to generate your own mapboxToken by creating an account. This token will NOT work for your website, you need to generate your own one!

    */

   var config = {
        mapboxToken: 'pk.eyJ1Ijoiem9sdGFudGhlbWVzYmVyZyIsImEiOiJjazZqaWUwcWswYTBvM21td2Jmcm5mYmdyIn0.7_5YCbbOFRnvqZzCNDo9fw',
        mapboxId: 'mapbox/light-v10'
    };

    var baseLatLng = [37.57, -122.26];
    var zoom = 10;
    var listings = [
        {
            url: '#',
            latLng: [37.70, -122.41],
            name: 'Call with Jane',
            date: 'Tomorrow at 12:30 PM'
        },
        {
            url: '#',
            latLng: [37.59, -122.39],
            name: 'HackTM conference',
            date: 'In about 5 minutes'
        },
        {
            url: '#',
            latLng: [37.52, -122.29],
            name: 'Marketing event',
            date: 'Today at 1:00 PM'
        },
        {
            url: '#',
            latLng: [37.37, -122.12],
            name: 'Dinner with partners',
            date: 'In 2 hours'
        },
        {
            url: '#',
            latLng: [37.36, -121.94],
            name: 'Interview with Google',
            date: 'In two days at 15:00 PM'
        }
    ];

    if (d.querySelector('#mapbox')) {

        var icon = L.icon({
            iconUrl: '../assets/img/marker.svg',
            iconSize:     [38, 95], // size of the icon
            shadowSize:   [50, 64], // size of the shadow
            iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
        });

        // modal listing view
        var mapListings = L.map('mapbox').setView(baseLatLng, zoom);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: config.mapboxId,
            accessToken: config.mapboxToken
        }).addTo(mapListings);

        listings.map(function (listing, index) {
            var popupHtml = `
                <a href="${listing.url}" class="card card-article-wide border-0 flex-column no-gutters no-hover">
                    <div class="card-body py-0 d-flex flex-column justify-content-between col-12">
                        <h4 class="h5 font-weight-normal mb-2">${listing.name}</h4>
                        <div class="d-flex"><div class="icon icon-xs icon-tertiary mr-2"><span class="fas fa-clock"></span></div><div class="font-xs text-dark">${listing.date}</div></div>
                    </div>
                </a>
            `;

            var marker = L.marker(listing.latLng, { icon: icon }).addTo(mapListings);
            marker.bindPopup(popupHtml);
        });
    }

    // Choices.js
    var selectStateInputEl = d.querySelector('#state');
    if(selectStateInputEl) {
        const choices = new Choices(selectStateInputEl); 
    }

    // multiple
    var selectStatesInputEl = d.querySelector('#states');
    if(selectStatesInputEl) {
        const choices = new Choices(selectStatesInputEl); 
    }

    // Pricing countup
    var billingSwitchEl = d.getElementById('billingSwitch');
    if(billingSwitchEl) {
        var priceStandardEl = d.getElementById('priceStandard');
        const countUpStandard = new countUp.CountUp('priceStandard', 99, { startVal: 199 });
        const countUpPremium = new countUp.CountUp('pricePremium', 199, { startVal: 299 });
        
        billingSwitchEl.addEventListener('change', function() {
            if(billingSwitch.checked) {
                countUpStandard.start();
                countUpPremium.start();
            } else {
                countUpStandard.reset();
                countUpPremium.reset();
                countUpStandard.update(99);
                countUpPremium.update(199);
            }
        });
    }

});