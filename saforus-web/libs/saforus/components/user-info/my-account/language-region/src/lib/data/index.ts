import { fetchLanguages, fetchTimeZone } from './api';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';

export function useRegisterData() {
  const { data: timeZones } = useQuery<unknown, Error, any>({
    queryKey: ['TIMEZONE'],
    queryFn: async () => {
      return fetchTimeZone();
    },
  });

  const { data: languages } = useQuery<unknown, Error, any>({
    queryKey: ['LANGUAGE'],
    queryFn: async () => {
      return fetchLanguages();
    },
  });

  const {
    formState: { errors },
    control,
  } = useForm<{ languageCode: string; timeZone: string }>({});

  return {
    timeZones,
    languages,
    control,
  };
}
