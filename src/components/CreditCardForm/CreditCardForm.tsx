import { ChangeEvent, FC, FocusEvent } from 'react';
import { getCreditCardIcon } from '../../helpers/creditCard.data';
import { ErrorFormData, FormData } from '../CartModal/CartModal';
import Input from '../ui/Input/Input';
import styles from './CreditCardForm.module.scss';

interface CreditCardFormProps {
  changeInputHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  blurInputHandler: (e: FocusEvent<HTMLInputElement>) => void;
  errors: ErrorFormData;
  formData: FormData;
}

const CreditCardForm: FC<CreditCardFormProps> = ({ changeInputHandler, errors, formData, blurInputHandler }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <div className={styles.card_number}>
          <Input
            label="Card number"
            name="cardNumber"
            value={formData.cardNumber}
            error={errors.cardNumber}
            onChange={changeInputHandler}
            onBlur={blurInputHandler}
          />
          <div className={styles.card_type}>{getCreditCardIcon(formData.cardNumber[0])}</div>
        </div>
        <div className={styles.group}>
          <Input
            label="Expiration"
            name="expiration"
            error={errors.expiration}
            onChange={changeInputHandler}
            value={formData.expiration}
            onBlur={blurInputHandler}
          />
          <Input
            label="Secure code"
            name="secureCode"
            error={errors.secureCode}
            onChange={changeInputHandler}
            value={formData.secureCode}
            onBlur={blurInputHandler}
            maxLength={3}
          />
        </div>
      </div>
    </div>
  );
};
export default CreditCardForm;
