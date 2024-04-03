import React, {useState} from 'react';
import {TouchableWithoutFeedback, View} from 'react-native';
import {
  ButtonFilterText,
  Container,
  ModalContent,
  ButtonFilter,
} from './styled';

import {Calendar, LocaleConfig} from 'react-native-calendars';
import {ptBR} from './localeCalendar';

LocaleConfig.locales['pt-br'] = ptBR;
LocaleConfig.defaultLocale = 'pt-br';

const CalendarModal = ({setVisible, handleFilter}) => {
  const [dateNow, setDateNow] = useState(new Date());
  const [markeddates, setMarkedDates] = useState({});

  function handleOnDayPress(date) {
    setDateNow(new Date(date.dateString));

    let markedDay = {};

    markedDay[date.dateString] = {
      selected: true,
      selectedColor: '#3b3dbf',
      textColor: '#FFF',
    };
    setMarkedDates(markedDay);
  }

  function handleFilterDate() {
    handleFilter(dateNow);
    setVisible();
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={setVisible}>
        <View style={{flex: 1}} />
      </TouchableWithoutFeedback>

      <ModalContent>
        <Calendar
          onDayPress={handleOnDayPress}
          markedDates={markeddates}
          enableSwipeMonths={true}
          theme={{
            todayTextColor: '#F00f00',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#FFF',
          }}
        />
        <ButtonFilter onPress={handleFilterDate}>
          <ButtonFilterText>Filtrar </ButtonFilterText>
        </ButtonFilter>
      </ModalContent>
    </Container>
  );
};

export default CalendarModal;
