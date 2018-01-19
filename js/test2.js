    Dropzone.autoDiscover = false;

    $(document).ready(function() {

        $(function() {
            var start = moment().subtract(29, 'days');
            var end = moment();

            function cb(start, end) {
                // alert('hello world'); //etc, your code here
                $('#reportrange span').html("Date");
            }

            $('#reportrange').on('apply.daterangepicker', function(ev, picker) {
                $(".datepicker").addClass("active");
            });

            $('#reportrange').daterangepicker({
                startDate: start,
                endDate: end,
                opens: "right",
                ranges: {
                    'Today': [moment(), moment()],
                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }, cb);
            cb(start, end);

            $(document).on('click', '.price-filter .dropdown-menu', function(e) {
                e.stopPropagation();
            });
        });

        $(".filter .apply-btn .apply").click(function(e) {
            e.preventDefault;
            $(this).parents(".filter").addClass("active");
            // $('.dropdown.open .dropdown-toggle').dropdown('toggle');
            $(this).parents(".dropdown").find(".dropdown-toggle").dropdown('toggle');
        })

        $("div#filedrop").dropzone({
            url: "/file/post"
        });

        $('#multiselect-ui').multiselect({
            includeSelectAllOption: true,
            buttonText: function(options, select) {
                return 'Country';
            },
            onChange: function(option, checked) {
                // Get selected options.
                var selectedOptions = $('#multiselect-ui option:selected');
                if (selectedOptions.length > 0) {
                    $(".country-filter").addClass("active");
                } else {
                    $(".country-filter").removeClass("active");
                }
            }
        });

        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function(event, ui) {
                $(".price").html("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });


        $(".price").html("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));

        $(".invoice_list .checkbox-col input").click(function() {
            if ($(".invoice_list .checkbox-col input:checked").length > 0) {
                $(".select_acts-btns").removeClass("hide");
            } else {
                $(".select_acts-btns").addClass("hide");
            }
        });


        $("#select_all input").click(function() {
            if ($(this).prop("checked") == true) {
                $(".invoice_list .checkbox-col input[type='checkbox']").each(function() {
                    $(this).prop("checked", true);
                });
                $(".select_acts-btns").removeClass("hide");
            } else {
                $(".invoice_list .checkbox-col input[type='checkbox']").each(function() {
                    $(this).prop("checked", false);
                })
                $(".select_acts-btns").addClass("hide");
            }
        })
    })