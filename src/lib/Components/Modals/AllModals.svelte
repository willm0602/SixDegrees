<script lang="ts">
	import { Modal, type ModalComponent } from '@skeletonlabs/skeleton';
	import ActorSelectModal from './ActorSelectModal.svelte';
	import MediaSelectModal from './MediaSelectModal.svelte';
	import GameSummaryModal from './GameSummaryModal.svelte';

	const modalComponentRegistry: Record<string, ModalComponent> = {
		actorSelectModal: {
			ref: ActorSelectModal
		},
		mediaSelectModal: {
			ref: MediaSelectModal
		},
		gameSummary: {
			ref: GameSummaryModal
		}
	};
</script>

<Modal components={modalComponentRegistry} />
