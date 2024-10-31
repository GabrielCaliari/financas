import React from 'react';
import {TextInputProps} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import {Container, Error, Input} from './styled';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string | undefined;
}

export const InputControl: React.FunctionComponent<Props> = ({
  control,
  name,
  error,
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
            placeholderTextColor="white"
          />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};