/**
 * Copyright © 2025 IAV GmbH Ingenieurgesellschaft Auto und Verkehr, All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import {SelectButton} from "primereact/selectbutton";
import {useState} from "react";
import {UILayer} from "@iav-ff-test-2/frontend-framework/uiLayer";
import {TranslateFunctionType} from "@iav-ff-test-2/frontend-framework/translationFunction";
import {BasicContentWrapper} from "@iav-ff-test-2/frontend-framework/basicContentWrapper";
import {Group} from "@iav-ff-test-2/frontend-framework/group";
import InfoIcon from "./assets/infoIcon.svg?react";
import {LegalDocuments} from "./components/legalDocuments";
import {ExampleComponent1} from "./components/exampleComponent1";
import {ExampleComponent6} from "./components/exampleComponent6";
import {ExampleComponent3} from "./components/exampleComponent3";
import {ExampleComponent4} from "./components/exampleComponent4";
import {ExampleComponent5} from "./components/exampleComponent5";
import {simpleNavbarTabFactory} from "@iav-ff-test-2/frontend-framework/simpleNavbarTabFactory";
import {privilegedNavbarTabFactory} from "@iav-ff-test-2/frontend-framework/privilegedNavbarTabFactory";
import {ExampleComponent2} from "./components/exampleComponent2";
import {HeaderPanelElement} from "@iav-ff-test-2/frontend-framework/headerPanelElement";
import {PrimeIcons} from "primereact/api";
import {WHITE} from "@iav-ff-test-2/frontend-framework/constants";
import {HeaderMenuElement} from "@iav-ff-test-2/frontend-framework/headerMenuElement";
import { ExampleComponent7 } from "./components/exampleComponent7";
import { AwsAuthenticationView } from "./components/aws_example/store";

function Layout() {
    const [selectedButtonOption, setSelectedButtonOption] = useState("Simulated");

    const settingsMenuOptions = {
        additionalItems: [
            {
                template: (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <SelectButton
                            options={["Simulated", "Real"]}
                            value={selectedButtonOption}
                            onChange={(ev) => setSelectedButtonOption(ev.value)}
                        />
                    </div>
                ),
            },
        ],
    };

    const views = [
        new BasicContentWrapper(
            "/",
            simpleNavbarTabFactory({
                disabled: false,
                name: "Example without Translation",
                icon: <InfoIcon/>,
            }),
            ExampleComponent1
        ),
        new BasicContentWrapper(
            "/2",
            simpleNavbarTabFactory({
                disabled: false,
                name: "Example for Redux Store",
                icon: <InfoIcon/>,
            }),
            ExampleComponent7
        ),
        new Group(
            (t: TranslateFunctionType) => t("Test_group_not_collapsible"),
            <InfoIcon/>,
            false,
            [
                new BasicContentWrapper(
                    "/group-example2/",
                    simpleNavbarTabFactory({
                        name: (t: TranslateFunctionType) =>
                            t("example_component", {count: 2}),
                        disabled: false,
                        icon: <InfoIcon/>,
                    }),
                    ExampleComponent2
                ),
            ]
        ),
        new BasicContentWrapper(
            "/group-example3/",
            privilegedNavbarTabFactory({
                name: (t: TranslateFunctionType) =>
                    t("example_component", {count: 3}),
                disabled: false,
                permittedGroups: ["ADMIN"],
                icon: <InfoIcon/>,
            }),
            ExampleComponent3
        ),
        new BasicContentWrapper(
            "/group-example4/",
            simpleNavbarTabFactory({
                name: (t: TranslateFunctionType) =>
                    t("example_component", {count: 4}),
                disabled: false,
                icon: <InfoIcon/>,
            }),
            ExampleComponent4
        ),
        new Group(
            (t: TranslateFunctionType) => t("Test_group_collapsible"),
            <InfoIcon/>,
            true,
            [
                new Group("Untergruppe", <InfoIcon/>, true, [
                    new BasicContentWrapper(
                        "/group-example51/",
                        simpleNavbarTabFactory({
                            name: (t: TranslateFunctionType) =>
                                t("example_component", {count: 5.1}),
                            disabled: false,
                            icon: <InfoIcon/>,
                        }),
                        ExampleComponent3
                    ),
                ]),
                new BasicContentWrapper(
                    "/group-example52/",
                    simpleNavbarTabFactory({
                        name: (t: TranslateFunctionType) =>
                            t("example_component", {count: 5.2}),
                        disabled: false,
                        icon: <InfoIcon/>,
                    }),
                    ExampleComponent4
                ),
                new BasicContentWrapper(
                    "/group-example53/",
                    simpleNavbarTabFactory({
                        name: (t: TranslateFunctionType) =>
                            t("example_component", {count: 5.3}),
                        disabled: true,
                        icon: <InfoIcon/>,
                    }),
                    ExampleComponent3
                ),
            ]
        ),
        new BasicContentWrapper(
            "/group-example6/",
            simpleNavbarTabFactory({
                name: (t: TranslateFunctionType) =>
                    t("example_component", {count: 6}),
                disabled: false,
                icon: <InfoIcon/>,
            }),
            ExampleComponent5
        ),
        new BasicContentWrapper(
            "/group-example7/",
            simpleNavbarTabFactory({
                name: (t: TranslateFunctionType) =>
                    t("example_component", {count: 7}),
                disabled: false,
                icon: <InfoIcon/>,
            }),
            ExampleComponent6
        ),
        new BasicContentWrapper(
            "/nested-route/example1/",
            simpleNavbarTabFactory({
                name: (t: TranslateFunctionType) =>
                    t("example_component", {count: 8}),
                disabled: false,
                icon: <InfoIcon/>,
            }),
            ExampleComponent6
        ),
    ];

    const items = [
        {
            label: 'Translate',
            icon: 'pi pi-language'
        },
        {
            label: 'Speech',
            icon: 'pi pi-volume-up',
            items: [
                {
                    label: 'Start',
                    icon: 'pi pi-caret-right'
                },
                {
                    label: 'Stop',
                    icon: 'pi pi-pause'
                }
            ]
        },
        {
            separator: true
        },
        {
            label: 'Print',
            icon: 'pi pi-print'
        }
    ];

    const headerElements = [
        (
            <HeaderPanelElement
                icon={PrimeIcons.BELL}
                iconstyle={{color: WHITE}}>
                <ExampleComponent4/>
            </HeaderPanelElement>
        ),
        (
            <HeaderMenuElement
                icon={PrimeIcons.HEART}
                model={items}
                iconstyle={{color: WHITE}}
            />
        )
    ];
    
    return (
        <UILayer
            authOptions={{
                errorMessages: {
                    passwordErrorMessage: "Invalid password. Please try again."
                },
            }}
            tabAndContentWrappers={views}
            startingPoint="/"
            authenticationView={AwsAuthenticationView}
            settingsMenuOptions={settingsMenuOptions}
            documentsLabelKey="Legal_documents"
            documentsComponent={LegalDocuments}
            headerOptions={{
                userIcon: <InfoIcon style={{backgroundColor: WHITE}}/>,
                reactElementLeft: <span className="ml-3">Dev application</span>,
                headerElements: headerElements,
                hideUserIcon: false
            }}
        />
    );
}

export default Layout;
