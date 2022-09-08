/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class OPActorSheet extends ActorSheet {

  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["system-styles"],
      template: "systems/opd20/templates/actor/actor-sheet.html",
      width: 600,
      height: 800,
      tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
    });
  }

  /** @override */
  get template() {
    return `systems/opd20/templates/actor/actor-${this.actor.data.type}-sheet.html`;
  }

  /** @override */
  getData(){
    const context = super.getData();
    const actorData = context.actor.data;

    context.data = actorData.data;
    context.flags = actorData.flags;

    if(actorData.type == 'PC'){
      this._prepareItems(context);
      this._prepareCharacterData(context);
    }

    if(actorData.type == 'NPC'){
      this._prepareNpcData(context);
    }

    context.rollData = context.actor.getRollData();

    context.effects = prepareActiveEffectCategories(this.actor.effects);

    return context;
  }