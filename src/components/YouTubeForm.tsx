import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools';

let rendercount = 0;
type FormValues = {
    username: string;
    email: string;
    channel: string;
}

export const YouTubeForm = () => {
    const form = useForm<FormValues>();
  rendercount++
    // console.log(form)
    const { register, control, handleSubmit, formState } = form;
    const { errors } = formState;
    console.log(formState)
     const onSubmit = (data: FormValues)=>{
       console.log("form submitted", data)
     }

    return (
      <div>
        <h1>YouTube Form {rendercount/2}</h1>
  
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <label htmlFor="username">Username</label>
          <input type="text" id="username"  {...register('username', {
            required: {
                value: true,
                message: 'Username is Required ..'
            }
          })} />
          <p className="error">{errors.username?.message}</p>
  
          <label htmlFor="email">E-mail</label>
          <input type="email" id="email" {...register('email', {
            pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: 'Invalid Email format'
            },
            validate: {
                notAdmin: (fieldValue)=>{
                    return(
                         fieldValue !== 'admin@gmail.com' || 'Enter a different email'
                        )
                },
                notBlackListed: (fieldValue)=>{
                    return (
                        !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                    )
                }
            
            },
          })} />
           <p className="error">{errors.email?.message}</p>
          <label htmlFor="channel">Channel</label>
          <input type="text" id="channel" {...register('channel', {
            required: {
                value: true,
                message: 'Channel is required.'
            }
          })} />
           <p className="error">{errors.channel?.message}</p>
          <button>Submit</button>
        </form>
        <DevTool control={control} />
      </div>
    );
  };