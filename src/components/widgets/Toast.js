import { toast } from 'react-toastify';
import { toastOptions } from '../../constants';

const ToastContent = ({ message, type }) => {
    let title = 'Info', icon = 'fa fa-info-circle';
    if (type === 'success') { title = 'Success'; icon = 'fa fa-check-circle' }
    else if (type === 'warn') { title = 'Warning'; icon = 'fa fa-exclamation-triangle' }
    else if (type === 'error') { title = 'Error'; icon = 'fa fa-exclamation-circle' }

    return (<div>
        <h4>
            <i className={icon} aria-hidden="true" />{title}
        </h4>
        {message}
    </div>);
};

export const customToast=(type,message,options)=>{
    if(message){
        toast[type](
            <ToastContent message={message} type={type} />,
            { ...toastOptions, className: `toast-${type}`, ...options&&{options} }
        )
    }
};