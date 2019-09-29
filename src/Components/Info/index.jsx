import { message } from 'antd';

export const success = (description) => {
    message.success(description);
};

export const error = (description) => {
    message.error(description);
};

export const warning = (description) => {
    message.warning(description);
};
