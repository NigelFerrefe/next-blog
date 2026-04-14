'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import EditText from '@/components/forms/EditText';
import EditSelect from '@/components/forms/EditSelect';
import EditRichText from '@/components/forms/EditRichText';
import EditImage from './EditImage';
import { Button } from '@/components/ui/Button';

import { createPostSchema } from '@/schemas/blog';
import { ICreatePost } from '@/types/blog/post';
import { useCategoriesList } from '@/hooks/useCategories';
import LoadingMoon from '../loaders/LoadingMoon';
import { useCreatePost } from '@/hooks/useCreatePost';
import { ToastSuccess } from '../toast/alerts';
import useThumbnailPostPicture from '@/hooks/useThumbnailPostPicture';

type FormData = z.infer<typeof createPostSchema>;

export default function CreatePostForm() {
  const createPostMutation = useCreatePost();

  const { categories, isLoading: loadingCategories } = useCategoriesList();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createPostSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      description: '',
      content: '',
      slug: '',
      category: '',
      keywords: '',
      status: 'draft',
    },
  });

  const {
    thumbnailPicture,
    setThumbnailPicture,
    percentage,
    hasChanges,
    onLoad,
    handleSave,
    hasImage,
    clearImage,
  } = useThumbnailPostPicture();

  const categoryOptions = categories.map((cat) => ({
    value: cat.slug,
    label: cat.name,
  }));

  const onSubmit = async (data: FormData) => {
    const thumbnailData = hasChanges && hasImage ? await handleSave(data.slug) : null;

    const postData: ICreatePost = {
      title: data.title,
      description: data.description,
      content: data.content,
      keywords: data.keywords,
      slug: data.slug,
      category: data.category,
      status: data.status,
      ...(thumbnailData),
    };

    await createPostMutation.mutateAsync(postData);
    ToastSuccess('Post created successfully!');
    reset();
    clearImage();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 pt-10">
      <EditText
        title="Título"
        description="Título del post"
        placeholder="Introduce el título"
        required
        register={register('title')}
        error={errors.title?.message}
      />

      <EditText
        title="Descripción"
        description="Breve descripción"
        placeholder="Introduce la descripción"
        required
        register={register('description')}
        error={errors.description?.message}
      />

      <EditText
        title="Keywords"
        description="Palabras clave"
        placeholder="Introduce las keywords"
        register={register('keywords')}
        error={errors.keywords?.message}
      />

      <EditText
        title="Slug"
        description="Slug único del post"
        placeholder="mi-post"
        required
        register={register('slug')}
        error={errors.slug?.message}
      />

      <EditSelect
        title="Categoría"
        description="Selecciona una categoría"
        placeholder="Selecciona una categoría"
        required
        disabled={loadingCategories}
        register={register('category')}
        options={categoryOptions}
        error={errors.category?.message}
      />

      <EditSelect
        title="Status"
        description="Selecciona el estado"
        placeholder="Selecciona un estado"
        required
        register={register('status')}
        options={[
          { value: 'draft', label: 'Draft' },
          { value: 'published', label: 'Published' },
        ]}
        error={errors.status?.message}
      />

      <EditImage
        data={thumbnailPicture}
        setData={(value) => {
          if (value === null) {
            clearImage();
            return;
          }
          setThumbnailPicture(value);
        }}
        onLoad={onLoad}
        percentage={percentage}
        variant="profile"
        title="Thumbnail"
        description="Imagen destacada del post"
      />

      <EditRichText
        name="content"
        control={control}
        title="Contenido"
        description="Contenido del post"
        required
        error={errors.content?.message}
      />

      <Button type="submit">{createPostMutation.isPending ? <LoadingMoon /> : 'Crear post'}</Button>
    </form>
  );
}
