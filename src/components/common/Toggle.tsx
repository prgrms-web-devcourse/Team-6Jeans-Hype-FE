import useToggle from '@/hooks/useToggle';
import styled from '@emotion/styled';

const ToggleContainer = styled.label`
  display: inline-block;
  cursor: pointer;
  user-select: none;
`;

const ToggleSwitch = styled.div`
  width: 64px;
  height: 30px;
  padding: 2px;
  background-color: #ccc;
  border-radius: 15px;
  box-sizing: border-box;
  transition: background-color 0.3s ease-out;

  &:after {
    content: '';
    position: relative;
    left: 0;
    display: block;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: white;
    transition: left 0.3s ease-out;
  }
`;

const ToggleInput = styled.input`
  display: none;

  &:checked + div {
    background: black;
  }

  &:checked + div:after {
    left: calc(100% - 26px);
  }

  &:disabled + div {
    opacity: 0.7;
    cursor: not-allowed;

    &:after {
      opacity: 0.7;
    }
  }
`;

interface ToggleProps{
  name: string;
  on?: boolean;
  disabled: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function Toggle({
  name,
  on = false,
  disabled,
  onChange,
}: ToggleProps) {
  const { state, toggle } = useToggle(on);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggle();
    onChange?.(e);
  };

  return (
    <ToggleContainer>
      <ToggleInput
        type='checkbox'
        name={name}
        checked={state}
        disabled={disabled}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <ToggleSwitch />
    </ToggleContainer>
  );
}

export default Toggle;
