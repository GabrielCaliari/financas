import React from 'react';
import {TextInputProps} from 'react-native';
import {Control, Controller} from 'react-hook-form';
import {Container, Input} from './styled';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error?: string;
  textColor?: string; // Nova propriedade para definir a cor do texto
}

export const InputControl: React.FunctionComponent<Props> = ({
  control,
  name,
  textColor = 'black', // Cor padrão é preto
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
            style={{color: textColor}} // Aplica a cor do texto
          />
        )}
        name={name}
      />
    </Container>
  );
};
