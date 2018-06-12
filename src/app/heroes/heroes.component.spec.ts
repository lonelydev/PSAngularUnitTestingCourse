import { HeroesComponent } from "./heroes.component";
import { of } from "rxjs/observable/of";

describe("HeroesComponent", () => {
    let component: HeroesComponent;
    let HEROES;
    let mockHeroService;

    beforeEach(() => {
        HEROES = [
            { id: 1, name: "SpiderDude", strength: 8 },
            { id: 2, name: "Wonderful Woman", strength: 24 },
            { id: 3, name: "Super Dude", strength: 55 }
        ];

        mockHeroService = jasmine.createSpyObj(["getHeroes", "addHero", "deleteHero"]);

        /**
         * to create a heroescomponent you need a heroesservice!
         * we don't want to use the real service as it makes an http call.
         * so we need to somehow give it a fake/stub/test-double
         */
        component = new HeroesComponent(mockHeroService);
    });

    describe("delete", () => {

        /**
         * This is a test to check if the component's state is changed by calling delete
         */
        it("should remove the indicated hero from the heroes list", () => {
            /** 
             * to make our mock service to actually return an observable we do this
             */
            mockHeroService.deleteHero.and.returnValue(of(true));

            component.heroes = HEROES;

            component.delete(HEROES[2]);
            expect(component.heroes.length).toBe(2);
            expect(component.heroes.find(t => t.id === 2)).toBeDefined();
            expect(component.heroes.find(t => t.id === 3)).toBeUndefined();
        });

        it("should call heroService.deleteHero was called with the right hero parameter", () => {
            mockHeroService.deleteHero.and.returnValue(of(true));
            component.heroes = HEROES;
            component.delete(HEROES[2]);
            expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[2]);
        });
    });
});