import { Button } from '@/components/ui/button';
import { UploadMedia as BaseUploadMedia } from '@/components/upload-media/base-upload-media';

export default function Page() {
  function handleClick() {
    console.log('upload image to r2');
  }

  return (
    <main>
      <section>
        <div>
          <BaseUploadMedia />
          <Button onClick={handleClick}>Uplode image to r2</Button>
        </div>
      </section>
    </main>
  );
}
