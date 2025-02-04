import { AwaitingTrip } from './AwaitingTrip';
import { PersonalTrip } from './PersonalTrip';
import { SharedTrip } from './SharedTrip';

export const Trip = ({
  type,
  name,
  id,
}: {
  type: number;
  name: string;
  id?: string;
}) => {
  switch (type) {
    case 0:
      return <PersonalTrip name={name} />;
    case 1:
      return <SharedTrip name={name} />;
    case 2:
      return <AwaitingTrip name={name} id={id ? id : ''} />;
    default:
      return <PersonalTrip name={name} />;
  }
};
