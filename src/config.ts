import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';

	static payPalEnvironmentSandbox = 'AZVnx7SEk13xX-UwJjbHRzhXow7T38pR8dig7g0H5qXRVm_oUjvaFzyF6BFdhBfhsA6TWmC25e04KaBe';
static payPalEnvironmentProduction = '';
}