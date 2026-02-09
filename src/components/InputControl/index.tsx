import React from 'react';
import {TextInputProps} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import {Container, Input} from './styled';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
  textColor?: string;
  placeholderTextColor?: string;
}

export const InputControl: React.FunctionComponent<Props> = ({
  control,
  name,
  textColor = 'black',
  placeholderTextColor,
  ...otherProps
}) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({field: {onChange, value}}) => (
          <Input
            onChangeText={onChange}
            value={value}
            {...otherProps}
            placeholderTextColor={placeholderTextColor}
            style={{color: textColor}}
          />
        )}
        name={name}
      />
    </Container>
  );
};
