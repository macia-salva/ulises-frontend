import { getTpDocument, letterFromDocument } from './document.validator';

describe('DocumentValidatot', () => {
  it('Reconoce el formato NIF', () => {
    expect(getTpDocument('12345678Z')).toBe('NIF');
  });

  it('Reconoce el formato CIF', () => {
    expect(getTpDocument('A1234567Z')).toBe('CIF');
  });
  it('Reconoce el formato NIE', () => {
    expect(getTpDocument('X1234567Z')).toBe('NIE');
  });
  it('Reconoce letra correcta NIF', () => {
    let letter = 'Z';
    let document = '12345678' + letter;
    expect(letterFromDocument(document)).toBe(letter);
  });
  it('Reconoce letra incorrecta NIF', () => {
    let letter = 'A';
    let document = '12345678' + letter;
    expect(letterFromDocument(document)).not.toBe(letter);
  });
});
