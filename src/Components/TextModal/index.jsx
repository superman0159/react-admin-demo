import { Modal } from 'antd';

const { confirm } = Modal;

export default function showConfirm(record, callback) {
    confirm({
        title: '你确定要执行删除操作?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            callback && callback()
            // console.log('OK');
        },
        onCancel() {
            // console.log('Cancel');
        },
    });
}