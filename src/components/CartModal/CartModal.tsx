import { ChangeEvent, FC, FocusEvent, FormEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  validateCardNumber,
  validateDeliveryAddress,
  validateEmail,
  validateExpiration,
  validateName,
  validatePhoneNumber,
  validateSecureCode,
} from '../../helpers/validation.util';
import { CartContext } from '../../providers/CartContextProvider';
import CreditCardForm from '../CreditCardForm/CreditCardForm';
import Modal from '../Modal/Modal';
import Button from '../ui/buttons/Button';
import Input from '../ui/Input/Input';
import styles from './CartModal.module.scss';

interface CartModalProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}

export interface FormData {
  name: string;
  phoneNumber: string;
  deliveryAddress: string;
  email: string;
  cardNumber: string;
  expiration: string;
  secureCode: string;
}

export interface ErrorFormData {
  name: string | null;
  phoneNumber: string | null;
  deliveryAddress: string | null;
  email: string | null;
  cardNumber: string | null;
  expiration: string | null;
  secureCode: string | null;
}

const initialFormData: FormData = {
  name: '',
  phoneNumber: '',
  deliveryAddress: '',
  email: '',
  cardNumber: '',
  expiration: '',
  secureCode: '',
};

const initialErrorFormData: ErrorFormData = {
  name: '',
  phoneNumber: '',
  deliveryAddress: '',
  email: '',
  cardNumber: '',
  expiration: '',
  secureCode: '',
};

const CartModal: FC<CartModalProps> = ({ isOpen, setIsOpen }) => {
  const { dispatch } = useContext(CartContext);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errorFormData, setErrorFormData] = useState<ErrorFormData>(initialErrorFormData);
  const [isOrderClose, setIsOrderClose] = useState<boolean>(false);
  const navigate = useNavigate();
  const validate = (key: string, value: string): void => {
    switch (key as keyof ErrorFormData) {
      case 'name': {
        setErrorFormData((data) => ({
          ...data,
          [key]: validateName(value),
        }));
        break;
      }
      case 'phoneNumber': {
        setErrorFormData((data) => ({
          ...data,
          [key]: validatePhoneNumber(value),
        }));
        break;
      }
      case 'deliveryAddress': {
        setErrorFormData((data) => ({
          ...data,
          [key]: validateDeliveryAddress(value),
        }));
        break;
      }
      case 'email': {
        setErrorFormData((data) => ({
          ...data,
          [key]: validateEmail(value),
        }));
        break;
      }
      case 'cardNumber': {
        setErrorFormData((data) => ({
          ...data,
          [key]: validateCardNumber(value),
        }));
        break;
      }
      case 'expiration': {
        setErrorFormData((data) => ({
          ...data,
          [key]: validateExpiration(value),
        }));
        break;
      }
      case 'secureCode': {
        setErrorFormData((data) => ({
          ...data,
          [key]: validateSecureCode(value),
        }));
        break;
      }
      default:
        break;
    }
  };

  const changeInputHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'cardNumber': {
        if ('0123456789 '.includes(value.slice(-1)) && value.length < 20) {
          const newValue = value
            .replace(/\s/g, '')
            .match(/.{1,4}/g)
            ?.join(' ') as string;
          setFormData({
            ...formData,
            [name]: newValue || '',
          });
        }
        break;
      }
      case 'secureCode': {
        if ('0123456789'.includes(value.slice(-1)) && value.length < 4) {
          setFormData({
            ...formData,
            [name]: value,
          });
        }
        break;
      }
      case 'expiration': {
        if ('0123456789/'.includes(value.slice(-1)) && value.length < 6) {
          const newValue = value
            .replace('/', '')
            .match(/.{1,2}/g)
            ?.join('/') as string;
          setFormData({
            ...formData,
            [name]: newValue || '',
          });
        }
        break;
      }
      default:
        setFormData({
          ...formData,
          [name]: value,
        });
        break;
    }
  };

  const blurInputHandler = (e: FocusEvent<HTMLInputElement>): void => {
    const name = e.target.name;
    const value = e.target.value;
    validate(name, value);
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    for (const key in formData) {
      validate(key, formData[key as keyof FormData]);
    }
    const errors = Object.values(errorFormData).filter((err) => err !== null);
    if (errors.length > 0) return;
    setFormData(initialFormData);
    setErrorFormData(initialErrorFormData);
    dispatch({ type: 'clearCart' });
    setIsOrderClose(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsOrderClose(false);
      navigate('/');
    }, 3000);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {!isOrderClose && (
        <div className={styles.wrapper}>
          <form onSubmit={submitFormHandler} className={styles.form}>
            <div className={styles.personal}>
              <h3 className={styles.title}>Personal details:</h3>
              <Input
                label="Name"
                name="name"
                value={formData.name}
                onChange={changeInputHandler}
                onBlur={blurInputHandler}
                error={errorFormData.name}
              />
              <Input
                label="Phone number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={changeInputHandler}
                onBlur={blurInputHandler}
                error={errorFormData.phoneNumber}
              />
              <Input
                label="Delivery address"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={changeInputHandler}
                onBlur={blurInputHandler}
                error={errorFormData.deliveryAddress}
              />
              <Input
                label="E-mail"
                name="email"
                value={formData.email}
                onBlur={blurInputHandler}
                onChange={changeInputHandler}
                error={errorFormData.email}
              />
            </div>
            <div className={styles.credit_card}>
              <h3 className={styles.title}>Credit card details:</h3>
              <CreditCardForm
                changeInputHandler={changeInputHandler}
                blurInputHandler={blurInputHandler}
                formData={formData}
                errors={errorFormData}
              />
            </div>
            <Button>Confirm</Button>
          </form>
        </div>
      )}
      {isOrderClose && <div>Thanks for your order. Redirect to the store after 3 sec</div>}
    </Modal>
  );
};
export default CartModal;
