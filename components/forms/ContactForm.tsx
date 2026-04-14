'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { ToastError, ToastSuccess } from '../toast/alerts';
import { newsletterContactSchema } from '@/schemas/newsletter';
import axios from 'axios';
import { newsletterContact } from '@/utils/api/newsletter';
import EditText from './EditText';
import { Building2, Mail, Phone } from 'lucide-react';
import EditEmail from './EditEmail';
import EditTextarea from './EditTextArea';
import LoadingMoon from '../loaders/LoadingMoon';
import { Button } from '../ui/Button';

type FormData = z.infer<typeof newsletterContactSchema>;

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(newsletterContactSchema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    const { firstName, lastName, email, phoneNumber, message } = data;

    try {
      await newsletterContact({
        firstName,
        lastName,
        email,
        phoneNumber,
        message,
      });

      ToastSuccess('Message sent successfully!');
      reset();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message =
          err.response?.data?.detail ?? err.response?.data?.error ?? 'Failed to subscribe';

        ToastError(message);
      } else {
        ToastError('Failed to send message, please try again.');
      }
    }
  };

  return (
    <div className="relative isolate">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">
              Get in touch
            </h2>
            <p className="dark:text-dark-txt mt-6 text-lg/8 text-gray-600">
              Proin volutpat consequat porttitor cras nullam gravida at. Orci molestie a eu arcu.
              Sed ut tincidunt integer elementum id sem. Arcu sed malesuada et magna.
            </p>
            <dl className="dark:text-dark-txt-secondary mt-10 space-y-4 text-base/7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Address</span>
                  <Building2 aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  Calle Falsa, 123
                  <br />
                  Barcelona, 08019
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Telephone</span>
                  <Phone aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <a href="tel:+34 648 485 462" className="hover:text-gray-900">
                    +34 648 485 462
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">Email</span>
                  <Mail aria-hidden="true" className="h-7 w-6 text-gray-400" />
                </dt>
                <dd>
                  <a href="mailto:hello@example.com" className="hover:text-gray-900">
                    hello@example.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-6 pt-20 pb-32 md:px-8 md:py-48 md:pb-24"
        >
          <div className="mx-auto max-w-xl md:mr-0 md:max-w-lg">
            <div className="grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-1">
              <EditText
                title="First Name"
                register={register('firstName')}
                error={errors.firstName?.message}
              />
              <EditText
                title="Last Name"
                register={register('lastName')}
                error={errors.lastName?.message}
              />
            </div>
            <div className="sm:col-span-2">
              <EditEmail register={register('email')} error={errors.email?.message} title="Email" />
            </div>
            <div className="sm:col-span-2">
              <EditText
                title="Phone number"
                register={register('phoneNumber')}
                error={errors.phoneNumber?.message}
              />
            </div>
            <div className="sm:col-span-2">
              <EditTextarea
                title="Message"
                placeholder="Tell us how we can help you"
                rows={6}
                register={register('message')}
                error={errors.message?.message}
              />
            </div>
            <div className="mt-8 flex justify-end">
              <Button type="submit" hoverEffect={isSubmitting} disabled={!isValid}>
                {isSubmitting ? <LoadingMoon /> : 'Send Message'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
