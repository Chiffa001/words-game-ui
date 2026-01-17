<script>
  import { Button, Modal } from '@chiffa001/tg-svelte-ui';
  import ExplosionIcon from '@/icons/explosion-icon.svelte';

  const reloadHandler = () => {
    location.reload();
  };
</script>

<Modal isOpen>
  <div class="flex min-h-[250px] w-full flex-col items-center justify-center">
    <div class="flex grow flex-col items-center justify-center gap-1">
      <ExplosionIcon />
      <p class="text-2xl">Something went wrong</p>
    </div>

    <Button className="mt-auto text-xl" onClick={reloadHandler}>Reload</Button>
  </div>
</Modal>
