import { SubMenu } from "./Submenu";

export class MenuUrl {
    id: string = "";
    val: string = "";
    url: string = "";
    icon: string = "";
    habilitado: boolean = false;
    auditoriafecha: Date = new Date();
    Usuario?: string = "";
}

export class Menu {
    titulo: string = ""
    icono: string = ""
    main: string = ""
    submenu: SubMenu[] = []
}