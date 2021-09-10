export const Name = ({ name }: { name: string }): JSX.Element => (
  <span style={{ fontFamily: 'Rubik', color: name === 'BloodyM_is_back' ? 'deeppink' : 'white' }}>
    {name} {name === 'BloodyM_is_back' ? '💅' : ''}
  </span>
);
