export class OPActor extends Actor{

	/** @override */
	prepareData(){
		// Prepare data for the actor. Calling the super version of this executes the following, in order: data reset (to clear active effects),
		// prepareBaseData(), prepareEmbeddedDocuments() (including active effects), prepareDerivedData().
		super.prepareData();
	}

	/** @override */
	prepareBaseData(){
		// Data modifications in this step occur before processing embedded documents or derived data.
	}

	/**
	 * @override
	 * Augment the basic actor data with additional dynamic data. Typically, you'll want to handle most of your calculated/derived data in this step.
	 * Data calculated in this step should generally not exist in template.json (such as ability modifiers rather than ability scores) and should be
	 * available both inside and outside of character sheets (such as if an actor is queried and has a roll executed directly from it).
	 */
	prepareDerivedData(){
		const actorData = this.data;
		const data = actorData.data;
		const flags = actorData.flags.op || {};

		// Make separate methods for each Actor type (character, npc, etc.) to keep
		// things organized.
		this._prepareCharacterData(actorData);
		this._prepareNpcData(actorData);
		this._prepareShipData(actorData);
	}

	/**
	 * Prepare Character type specific data
	 */
	_prepareCharacterData(actorData){
		if( actorData.type !== "PC" ) return;

		const data = actorData.data;

		for ( let [key,attribute] of Object.entries(data.attributes) ){
			attribute.mod = Math.floor((attribute.value - 10) / 2);
		}
	}

	/**
	 * Prepare NPC data
	 */
	_prepareNpcData(actorData){
		if( actorData.type !== "NPC" ) return;

		const data = actorData.data;
	}

	/**
	 * Prepare Ship data
	 */
	_prepareNpcData(actorData){
		if( actorData.type !== "Ship" ) return;

		const data = actorData.data;
	}


	/**
	 * Override getRollData
	 */
	getRollData(){
		const data = super.getRollData();

		this._getCharacterRollData(data);
		this._getNpcRollData(data);

		return data;
	}

	/**
	 * Prepare character roll data
	 */
	_getCharacterRollData(data){
		if( this.data.type !== "PC" ) return;

		// Translates @data.attributes.str to @str
		if( data.attributes ){
			for( let [k,v] of Object.entries(data.attributes)) {
				data[k] = foundry.utils.deepClone(v);
			}
		}
	}

	/**
	 *	Prepare NPC roll data
	 */
	_getNpcRollData(data){
		if( this.data.type !=== "NPC" ) return;

		// Translates @data.attributes.* to @*
		if( data.attributes ){
			for( let [k,v] of Object.entries(data.attributes)) {
				data[k] = foundry.utils.deepClone(v);
			}
		}
	}
}