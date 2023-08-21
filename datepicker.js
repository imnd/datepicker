/**
 * Datepicker
 *
 * @author Andrey Serdyuk imndsu@gmail.com
 * @copyright (c) 2023 IMND
 */

import dom from 'imnd-dom';
import locale from './locale.json';
import styles from './styles.css';
import template from './template';

/**
 * @param data
 * @return {void}
 */
const datepicker = data => {
  const options = {
    class: 'datepicker',
    locale: 'en',
  };

  const setOptions = data => {
    for (const key in data) {
      options[key] = data[key];
    }
  }
  setOptions(data || {});
  setOptions(locale[options.locale]);

  dom().ready(() => {
    dom()
      .findAllByClass(options.class)
      .each(datepickerInput => {
        const name = dom(datepickerInput).attr('name');

        let
          isHidden = true,
          time = (new Date()).getTime(),
          daysOfWeek = '',
          value,
          curMonthName,
          curYear,
          placeholder,
          datepickerDays,
          curMonth,
          selectedYear,
          selectedMonth,
          selectedDate,
          curMonthDays,
          prevMonthDays,
          nextMonthDays,
          hide
        ;
        /**
         * Counts the number of days in the month of the year
         * @param month
         * @param year
         */
        const getDaysInMonth = (month, year) => 32 - new Date(year, month, 32).getDate();
        /**
         * Fills an array with a series of numbers from start to end
         * @param start
         * @param end
         */
        const range = (start, end) => [...Array(end - start + 1)].map((_, key) => key + start);
        /**
         * Converts the day of the week from American to Russian
         * @param day
         */
        const ruDaysOfWeek = day => [6, 0, 1, 2, 3, 4, 5][day];

        const refreshTemplate = datepickerWrapper => {
          datepickerWrapper = datepickerWrapper ? dom(datepickerWrapper) : dom().findById(`datepicker-wrapper-${time}`);

          datepickerWrapper.replace(dom().renderTemplate(template, {
            id: time,
            value,
            name,
            curMonthName,
            curYear,
            placeholder,
            daysOfWeek,
            datepickerDays,
          }));

          const datepickerContainer = dom().findById(`datepicker-${time}`);

          if (isHidden === false) {
            datepickerContainer.removeClass('hidden');
          }

          // attach event handlers
          // show or hide the window when clicking on the input
          dom()
            .findById(`datepicker-input-${time}`)
            .click(e => {
              showDatepicker(datepickerContainer);
              e.stopPropagation();
            });

          datepickerContainer.click(e => {
            hide = false;
            e.stopPropagation();
          });
          dom(window)
            .click(() => {
              if (hide) {
                hideDatepicker(datepickerContainer);
              }
              hide = true;
            });

          // navigation
          dom().findById(`on-prev-month-${time}`).click(() => {
            curMonth--;
            if (curMonth === -1) {
              curMonth = 11;
              curYear--;
            }
            buildDatepicker();
          });
          dom().findById(`on-next-month-${time}`).click(() => {
            curMonth++;
            if (curMonth === 12) {
              curMonth = 0;
              curYear++;
            }
            buildDatepicker();
          });
          dom().findById(`on-prev-year-${time}`).click(() => {
            curYear--;
            buildDatepicker();
          });
          dom().findById(`on-next-year-${time}`).click(() => {
            curYear++;
            buildDatepicker();
          });

          // calendar days
          setDateHandlers(prevMonthDays, curMonth - 1);
          setDateHandlers(curMonthDays, curMonth);
          setDateHandlers(nextMonthDays, curMonth + 1);
        };

        const setDateHandlers = (days, month) => {
          for (let i in days) {
            let date = days[i];
            // fill input
            (dom().findById(`datepicker-date-${time}${date}${month}`).click(() => {
              isHidden = true;

              selectedDate = date;
              selectedMonth = month;
              if (curYear !== undefined) {
                selectedYear = curYear;
              }
              if (selectedMonth === -1) {
                selectedMonth = 11;
                selectedYear--;
              }
              if (selectedMonth === 12) {
                selectedMonth = 0;
                selectedYear++;
              }
              curMonth = selectedMonth;
              formatInputDate();
              buildDatepicker();
            }));
          }
        };

        /**
         * calculate calendar days
         */
        const buildDatepicker = datepicker => {
          curMonthName = options.monthNames[curMonth];
          // day of the week of the first day of the month
          let firstDay = (new Date(curYear, curMonth)).getDay();
          firstDay = ruDaysOfWeek(firstDay);
          // calculate the days of the current month
          const daysInMonth = getDaysInMonth(curMonth, curYear);
          curMonthDays = range(1, daysInMonth);
          // calculate the days of the previous month
          const dateTime = new Date(curYear, curMonth);
          dateTime.setDate(0);
          const prevLastDate = dateTime.getDate();
          const prevFirstDate = prevLastDate - firstDay + 1;
          prevMonthDays = range(prevFirstDate, prevLastDate);
          // calculate the days of the next month
          dateTime.setDate(daysInMonth + 1);
          const nextLastDate = 42 - daysInMonth - (prevLastDate - prevFirstDate) - 1;
          nextMonthDays = range(1, nextLastDate);

          datepickerDays = '';
          setDatepickerDays(prevMonthDays, curMonth - 1, 'prev-month');
          setDatepickerDays(curMonthDays, curMonth, 'curr-month');
          setDatepickerDays(nextMonthDays, curMonth + 1, 'next-month');

          refreshTemplate(datepicker);
        };

        const setDatepickerDays = (monthDays, month, spanClass) => {
          for (let i in monthDays) {
            let addClass = '';
            let date = monthDays[i];
            // whether the calendar day is today or selected
            if (date === selectedDate && month === selectedMonth && curYear === selectedYear) {
              addClass = ' is-active';
            }
            datepickerDays += `<li>
                <span
                    id="datepicker-date-${time}${date}${month}"
                    class="${spanClass}${addClass}">
                    ${date}
                </span>
            </li>`;
          }
        };

        const showDatepicker = datepicker => {
          isHidden = false;
          datepicker.removeClass('hidden');
        };

        const hideDatepicker = datepicker => {
          isHidden = true;
          datepicker.addClass('hidden');
        };

        const formatInputDate = () => {
          const dateFormatted = selectedDate.toString().padStart(2, 0);
          const monthFormatted = (selectedMonth + 1).toString().padStart(2, 0);

          value = `${dateFormatted}.${monthFormatted}.${selectedYear}`;
        };

        placeholder = options.placeholder;
        options.daysOfWeek.map(day => {
          daysOfWeek += `<li>${day}</li>`
        });

        let date = dom(datepickerInput).val();
        if (date !== '' && date !== null && date !== undefined) {
          [selectedYear, selectedMonth, selectedDate] = date.split('-').map(val => parseInt(val));
          selectedMonth--;
        } else {
          const curDateTime = new Date();
          selectedDate = curDateTime.getDate();
          selectedMonth = curDateTime.getMonth();
          selectedYear = curDateTime.getFullYear();
        }
        curMonth = selectedMonth;
        curYear = selectedYear;
        formatInputDate();
        buildDatepicker(datepickerInput);
      });
    // apply styles
    let styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
  });
};

export default datepicker;
