//Dont change it
requirejs(['ext_editor_io', 'jquery_190', 'raphael_210'],
    function (extIO, $) {
        function weeklyCalendarVisualization(tgt_node, data) {

            if (! data || ! data.ext) {
                return
            }

            const input = data.in
            const explanation = data.ext.explanation
            const answer = data.ext.answer

            /*----------------------------------------------*
             *
             * attr
             *
             *----------------------------------------------*/
            const attr = {
                year_month: {
                    'font-size': '15px',
                    'font-weight': 'bold',
                    'font-family': 'times',
                },
                weekday: {
                    'font-size': '12px',
                    'font-weight': 'bold',
                    'font-family': 'times',
                },
                day: {
                    'font-size': '18px',
                    'font-weight': 'bold',
                    'font-family': 'times',
                },
                sunday: {
                    'fill': 'red',
                },
                frame: {
                    'stroke-width': 0.2,
                },
                triangle: {
                    none: {
                        'stroke': '#666666',
                        'stroke-width': '0.2px',
                        'fill': '#dfe8f7',
                    },
                    lit: {
                        'fill': '#ffc965',
                        'stroke': '#666666',
                        'stroke-width': '0.2px',
                    },
                },
            }

            /*----------------------------------------------*
             *
             * values
             *
             *----------------------------------------------*/
            const width_px = 300
            const height_px = 100
            const [year, month, day, first_week_day] = input
            const month_english_list = ['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.']
            const weekday_english_list = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun',]

            /*----------------------------------------------*
             *
             * paper
             *
             *----------------------------------------------*/
            const paper = Raphael(tgt_node, width_px, height_px, 0, 0)

            /*----------------------------------------------*
             *
             * draw weekly calendar
             *
             *----------------------------------------------*/
             paper.text(width_px/2, 15, month_english_list[month-1] + ' ' + year).attr(attr.year_month)
             const edge = 35
             const left = width_px/2-edge*3.5
             for (let i = 0; i < 7; i += 1) {
                let offset = i*edge
                let cur_weekday = (first_week_day+i) % 7
                let ps = paper.set()
                ps.push(paper.text(left+edge/2+offset, 40, weekday_english_list[cur_weekday]).attr(attr.weekday))
                ps.push(paper.text(left+edge/2+offset, 50+edge/2, answer[i]).attr(attr.day))
                paper.rect(left+offset, 30, edge, 20).attr(attr.frame)
                paper.rect(left+offset, 50, edge, edge).attr(attr.frame)
                if (answer[i] == day) {
                    paper.circle(left+edge/2+offset, 50+edge/2, edge/2*0.8)
                }
                if (cur_weekday == 6) {
                    ps.attr(attr.sunday)
                }
             }
        }

        var $tryit;

        var io = new extIO({
            multipleArguments: true,
            functions: {
                python: 'weekly_calendar',
                js: 'weeklyCalendar'
            },
            animation: function($expl, data){
                weeklyCalendarVisualization(
                    $expl[0],
                    data,
                );
            }
        });
        io.start();
    }
);
