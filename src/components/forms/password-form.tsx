import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Dialog } from '../dialog';
import { Loading } from '../loading';

const passwordSchema = z.object({
  currentPassword: z.string().min(4, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
interface Props {
  handleClose: () => void;
}
type PasswordFormData = z.infer<typeof passwordSchema>;

export const PasswordForm = ({ handleClose }:Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    setIsLoading(true);
    const input = {currentPassword: data.currentPassword, newPassword: data.newPassword};
    const request = axios.post("/api/account/update/password", input);

    request
      .then((response) => {
        if (response.status === 200) {
          toast.success('Password updated successfully');
          reset(); 
          setIsLoading(false);
          handleClose();
        } 
      })
      .catch((error) => {
        setError(error.response.data.error);
      })
      .finally(() => {
        setIsLoading(false);
      }); 
  };

  return (
    <>
      <Dialog isOpen={Boolean(error)} onClose={()=>{setError(null)}}><p>{error}</p></Dialog>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 flex flex-col items-center">
          <div className="w-80 mx-32">
              <label>Current Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter current password"
                {...register('currentPassword')}
                id="currentPassword"
                />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
              )}
          </div>
          <div className="w-80 mx-32">
              <label>New Password</label>
              <input
                type="password" 
                {...register('newPassword')}
                name="newPassword"
                className="form-input"
                id="newPassword"
                placeholder="Enter new password"
                />
               {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
              )}
          </div>
          <div className="w-80 mx-32">
              <label>Confirm Password</label>
              <input 
                type="password" 
                {...register('confirmPassword')}
                name="confirmPassword"
                id="confirmPassword"
                className="form-input"
                placeholder="Confirm new password"
                />
          </div>

          <button
            type="submit"
            className="form-button-submit"
            //onClick={(e)=>handleSubmit(e)}
            >
               {isLoading ? <span><Loading/> Updating...</span> : 'Update Password'}
          </button>
      </form>
    </>
  )
}