import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';

interface WeekDayOption {
  today: any;
  selectedDays: any;
  handleSelectCheckBox: (newState: boolean, selectDays: { [x: string]: boolean }) => void;
}

function WeekDayChoice({ today, handleSelectCheckBox, selectedDays }: WeekDayOption) {
  const onHandleCheckBox = (checked: boolean, key: string) => {
    handleSelectCheckBox(checked, { [key]: checked });
  };

  return (
    <FormGroup aria-label="position" row>
      <FormControlLabel
        disabled={today.monday ? false : true}
        control={
          <Checkbox
            checked={selectedDays.monday}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onHandleCheckBox(event.target.checked, 'monday')
            }
          />
        }
        label="Mon"
        labelPlacement="top"
        sx={{ marginLeft: '0.5em' }}
      />
      <FormControlLabel
        disabled={today.tuesday ? false : true}
        control={
          <Checkbox
            checked={selectedDays.tuesday}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onHandleCheckBox(event.target.checked, 'tuesday')
            }
          />
        }
        label="Tue"
        labelPlacement="top"
        sx={{ marginLeft: '0.5em' }}
      />
      <FormControlLabel
        disabled={today.wednesday ? false : true}
        control={
          <Checkbox
            checked={selectedDays.wednesday}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onHandleCheckBox(event.target.checked, 'wednesday')
            }
          />
        }
        label="Wed"
        labelPlacement="top"
        sx={{ marginLeft: '0.5em' }}
      />
      <FormControlLabel
        disabled={today.thursday ? false : true}
        control={
          <Checkbox
            checked={selectedDays.thursday}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onHandleCheckBox(event.target.checked, 'thursday')
            }
          />
        }
        label="Thu"
        labelPlacement="top"
        sx={{ marginLeft: '0.5em' }}
      />
      <FormControlLabel
        disabled={today.friday ? false : true}
        control={
          <Checkbox
            checked={selectedDays.friday}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onHandleCheckBox(event.target.checked, 'friday')
            }
          />
        }
        label="Fri"
        labelPlacement="top"
        sx={{ marginLeft: '0.5em' }}
      />
      <FormControlLabel
        disabled={today.saturday ? false : true}
        control={
          <Checkbox
            checked={selectedDays.saturday}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onHandleCheckBox(event.target.checked, 'saturday')
            }
          />
        }
        label="Sat"
        labelPlacement="top"
        sx={{ marginLeft: '0.5em' }}
      />
      <FormControlLabel
        disabled={today.sunday ? false : true}
        control={
          <Checkbox
            checked={selectedDays.sunday}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              onHandleCheckBox(event.target.checked, 'sunday')
            }
          />
        }
        label="Sun"
        labelPlacement="top"
        sx={{ marginLeft: '0.5em' }}
      />
    </FormGroup>
  );
}

export default WeekDayChoice;
