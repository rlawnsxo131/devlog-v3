import { useMemo } from 'react';
import { toast, ToastPosition } from 'react-toastify';
import useThemeState from '@/hooks/theme/useThemeState';

const bodyStyle = {
  fontSize: '0.9rem',
};

export default function useToast() {
  const theme = useThemeState();

  return useMemo(
    () => ({
      success(text: string, position: ToastPosition = 'top-right') {
        toast.success(text, {
          bodyStyle,
          theme,
          position,
        });
      },
      error(text: string, position: ToastPosition = 'top-right') {
        toast.error(text, {
          bodyStyle,
          theme,
          position,
        });
      },
      warn(text: string, position: ToastPosition = 'top-right') {
        toast.warn(text, {
          bodyStyle,
          theme,
          position,
        });
      },
      info(text: string, position: ToastPosition = 'top-right') {
        toast.info(text, {
          icon: false,
          bodyStyle: {
            ...bodyStyle,
          },
          theme,
          progressStyle: {
            background: 'hsl(191deg 91% 37%)',
          },
          position,
        });
      },
      promisify(
        params: {
          func: () => Promise<void>;
          message: {
            pending: string;
            success: string;
            error: string;
          };
        },
        position: ToastPosition = 'top-right',
      ) {
        toast.promise(params.func, params.message, {
          theme,
          position,
        });
      },
    }),
    [theme],
  );
}
