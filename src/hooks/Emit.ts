import { emitKey } from '@/layouts';
import { TinyEmitter } from 'tiny-emitter';
import { inject } from 'vue';
export default function useEmit() {
    return inject<TinyEmitter>(emitKey)
}