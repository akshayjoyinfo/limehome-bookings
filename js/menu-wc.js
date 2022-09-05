'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">limehome-bookings documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-392a022b6929ccbc0a94a516a1846d18fa49e633a7276c41dcf9fc0a032fb93d9cc9450eb94c0509455286b4ad56298d206b6882ac9aa0e42c24e6413a2d21e2"' : 'data-target="#xs-controllers-links-module-AppModule-392a022b6929ccbc0a94a516a1846d18fa49e633a7276c41dcf9fc0a032fb93d9cc9450eb94c0509455286b4ad56298d206b6882ac9aa0e42c24e6413a2d21e2"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-392a022b6929ccbc0a94a516a1846d18fa49e633a7276c41dcf9fc0a032fb93d9cc9450eb94c0509455286b4ad56298d206b6882ac9aa0e42c24e6413a2d21e2"' :
                                            'id="xs-controllers-links-module-AppModule-392a022b6929ccbc0a94a516a1846d18fa49e633a7276c41dcf9fc0a032fb93d9cc9450eb94c0509455286b4ad56298d206b6882ac9aa0e42c24e6413a2d21e2"' }>
                                            <li class="link">
                                                <a href="controllers/HealthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HealthController</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BookingsModule.html" data-type="entity-link" >BookingsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-BookingsModule-777557a2f26fc0d8e0d6265ef5d0abd4fc531e0b8cdb30754e6f40a8f145c1727bae615f9b3dbc6a2e5367e8db03e2942e56f0b14f0b3875611d1d9945440136"' : 'data-target="#xs-controllers-links-module-BookingsModule-777557a2f26fc0d8e0d6265ef5d0abd4fc531e0b8cdb30754e6f40a8f145c1727bae615f9b3dbc6a2e5367e8db03e2942e56f0b14f0b3875611d1d9945440136"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-BookingsModule-777557a2f26fc0d8e0d6265ef5d0abd4fc531e0b8cdb30754e6f40a8f145c1727bae615f9b3dbc6a2e5367e8db03e2942e56f0b14f0b3875611d1d9945440136"' :
                                            'id="xs-controllers-links-module-BookingsModule-777557a2f26fc0d8e0d6265ef5d0abd4fc531e0b8cdb30754e6f40a8f145c1727bae615f9b3dbc6a2e5367e8db03e2942e56f0b14f0b3875611d1d9945440136"' }>
                                            <li class="link">
                                                <a href="controllers/HereHotelsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HereHotelsController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/HotelsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HotelsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-BookingsModule-777557a2f26fc0d8e0d6265ef5d0abd4fc531e0b8cdb30754e6f40a8f145c1727bae615f9b3dbc6a2e5367e8db03e2942e56f0b14f0b3875611d1d9945440136"' : 'data-target="#xs-injectables-links-module-BookingsModule-777557a2f26fc0d8e0d6265ef5d0abd4fc531e0b8cdb30754e6f40a8f145c1727bae615f9b3dbc6a2e5367e8db03e2942e56f0b14f0b3875611d1d9945440136"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-BookingsModule-777557a2f26fc0d8e0d6265ef5d0abd4fc531e0b8cdb30754e6f40a8f145c1727bae615f9b3dbc6a2e5367e8db03e2942e56f0b14f0b3875611d1d9945440136"' :
                                        'id="xs-injectables-links-module-BookingsModule-777557a2f26fc0d8e0d6265ef5d0abd4fc531e0b8cdb30754e6f40a8f145c1727bae615f9b3dbc6a2e5367e8db03e2942e56f0b14f0b3875611d1d9945440136"' }>
                                        <li class="link">
                                            <a href="injectables/BookingAvailableValidator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BookingAvailableValidator</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HereHotelDataProviderService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HereHotelDataProviderService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/HotelIdValidator.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HotelIdValidator</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ConfigModule.html" data-type="entity-link" >ConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/GlobalModule.html" data-type="entity-link" >GlobalModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/HealthController.html" data-type="entity-link" >HealthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HereHotelsController.html" data-type="entity-link" >HereHotelsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/HotelsController.html" data-type="entity-link" >HotelsController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/BookingAllocationEntity.html" data-type="entity-link" >BookingAllocationEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/BookingEntity.html" data-type="entity-link" >BookingEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/HotelEntity.html" data-type="entity-link" >HotelEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiContracts.html" data-type="entity-link" >ApiContracts</a>
                            </li>
                            <li class="link">
                                <a href="classes/ApiException.html" data-type="entity-link" >ApiException</a>
                            </li>
                            <li class="link">
                                <a href="classes/AppExceptionFilter.html" data-type="entity-link" >AppExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseEntity.html" data-type="entity-link" >BaseEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookingDetailReponseModel.html" data-type="entity-link" >BookingDetailReponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookingHotelResponseModel.html" data-type="entity-link" >BookingHotelResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/BookingReferenceDetailModel.html" data-type="entity-link" >BookingReferenceDetailModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookingCommand.html" data-type="entity-link" >CreateBookingCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateBookingCommandHandler.html" data-type="entity-link" >CreateBookingCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateHotelBookingRequest.html" data-type="entity-link" >CreateHotelBookingRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetHotelBookingsQuery.html" data-type="entity-link" >GetHotelBookingsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetHotelBookingsQueryHandler.html" data-type="entity-link" >GetHotelBookingsQueryHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetHotelsBookingsQuery.html" data-type="entity-link" >GetHotelsBookingsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/GuestDetail.html" data-type="entity-link" >GuestDetail</a>
                            </li>
                            <li class="link">
                                <a href="classes/HereHotelSyncRequest.html" data-type="entity-link" >HereHotelSyncRequest</a>
                            </li>
                            <li class="link">
                                <a href="classes/HotelBookingListResponseModel.html" data-type="entity-link" >HotelBookingListResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/HotelBookngParam.html" data-type="entity-link" >HotelBookngParam</a>
                            </li>
                            <li class="link">
                                <a href="classes/HotelEntity.html" data-type="entity-link" >HotelEntity</a>
                            </li>
                            <li class="link">
                                <a href="classes/HotelHereApiResponseModel.html" data-type="entity-link" >HotelHereApiResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/HotelListResponseModel.html" data-type="entity-link" >HotelListResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/HotelResponseModel.html" data-type="entity-link" >HotelResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/IConfigService.html" data-type="entity-link" >IConfigService</a>
                            </li>
                            <li class="link">
                                <a href="classes/IngestHotelsFromHereCommand.html" data-type="entity-link" >IngestHotelsFromHereCommand</a>
                            </li>
                            <li class="link">
                                <a href="classes/IngestHotelsFromHereCommandHandler.html" data-type="entity-link" >IngestHotelsFromHereCommandHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/SerachHotelsQuery.html" data-type="entity-link" >SerachHotelsQuery</a>
                            </li>
                            <li class="link">
                                <a href="classes/SerachHotelsQueryHandler.html" data-type="entity-link" >SerachHotelsQueryHandler</a>
                            </li>
                            <li class="link">
                                <a href="classes/SnakeNamingStrategy.html" data-type="entity-link" >SnakeNamingStrategy</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BookingAvailableValidator.html" data-type="entity-link" >BookingAvailableValidator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigurationService.html" data-type="entity-link" >ConfigurationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExceptionInterceptor.html" data-type="entity-link" >ExceptionInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HereHotelDataProviderService.html" data-type="entity-link" >HereHotelDataProviderService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HotelIdValidator.html" data-type="entity-link" >HotelIdValidator</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HttpLoggerInterceptor.html" data-type="entity-link" >HttpLoggerInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LimeHomeValidationPipe.html" data-type="entity-link" >LimeHomeValidationPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Address.html" data-type="entity-link" >Address</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ApiResponse.html" data-type="entity-link" >ApiResponse</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Category.html" data-type="entity-link" >Category</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Contact.html" data-type="entity-link" >Contact</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HotelHereItemModel.html" data-type="entity-link" >HotelHereItemModel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/HotelSearchResult.html" data-type="entity-link" >HotelSearchResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IHotelDataProvider.html" data-type="entity-link" >IHotelDataProvider</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Method.html" data-type="entity-link" >Method</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Payment.html" data-type="entity-link" >Payment</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Phone.html" data-type="entity-link" >Phone</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Position.html" data-type="entity-link" >Position</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Reference.html" data-type="entity-link" >Reference</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Supplier.html" data-type="entity-link" >Supplier</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});