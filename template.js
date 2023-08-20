const template = `
<div class="form__field datepicker-wrapper" id="datepicker-wrapper-{{ id }}">
    <div class="input-field input-field--append">
        <input class="datepicker-input" id="datepicker-input-{{ id }}" value="{{ value }}" placeholder="{{ placeholder }}" name="' + name + '"/>
        <div class="hidden datepicker" id="datepicker-{{ id }}">
            <div class="datepicker__nav">
                <div class="datepicker__nav-action on-prev-month" id="on-prev-month-{{ id }}">&#8592;</div>
                <div class="datepicker__nav-content">
                    <div class="datepicker__month">{{ curMonthName }}</div>
                    <div class="datepicker__year">{{ curYear }}
                        <div class="datepicker__year-arrows">
                            <div class="datepicker__year-arrow up on-next-year" id="on-next-year-{{ id }}">&#8743;</div>
                            <div class="datepicker__year-arrow down on-prev-year" id="on-prev-year-{{ id }}">&#8744;</div>
                        </div>
                    </div>
                </div>
                <div class="datepicker__nav-action control on-next-month" id="on-next-month-{{ id }}">&#8594;</div>
            </div>
            <ul class="datepicker__week">{{ daysOfWeek }}</ul>
            <ul class="datepicker__days">{{ datepickerDays }}</ul>
        </div>
    </div>
</div>
`;

export default template