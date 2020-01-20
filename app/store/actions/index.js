import AuthActions from "../../UI/components/auth/store/action";
import * as HomeActions from '../../UI/components/home/store/actions';
import LeadActions from "../../UI/components/leads/store/actions";
export default {
  ...AuthActions,
  ...HomeActions,
  ...LeadActions,
};
