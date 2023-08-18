<script lang="ts">
	import { Modal, type ModalComponent } from "@skeletonlabs/skeleton";
	import ActorSelectModal from "./ActorSelectModal.svelte";
	import MediaSelectModal from "./MediaSelectModal.svelte";

    const modalComponentRegistry: Record<string, ModalComponent> = {
        actorSelectModal: {
            ref: ActorSelectModal,
        },
        mediaSelectModal: {
            ref: MediaSelectModal
        }
    };
</script>

<Modal components={modalComponentRegistry} />