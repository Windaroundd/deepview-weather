import { setRecoil } from 'recoil-nexus';
import { isLoadingState } from '../recoil/atom';

export default function setLoading(state) {
  setRecoil(isLoadingState, state);
}
