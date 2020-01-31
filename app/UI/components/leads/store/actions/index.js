import * as getAllLeads from './getAllLeads';
import * as addLead from './addLead';
import * as updatelead from './updatelead';
const LeadActions = {
  ...getAllLeads,
  ...addLead,
  ...updatelead,
};
export default LeadActions;
