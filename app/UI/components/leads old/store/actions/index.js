import * as getAllLeads from './getAllLeads';
import * as addLead from './addLead';
import * as updatelead from './updatelead';
import * as searchLead from './searchLead';
const LeadActions = {
  ...getAllLeads,
  ...addLead,
  ...updatelead,
  ...searchLead,
};
export default LeadActions;
