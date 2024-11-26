export const verifyRoles = (...allowedRoles: readonly number[]) => {
    return (req: any, res: any, next: any) => {
        if (!req?.roles) return res.sendStatus(401);
        const rolesArray = [...allowedRoles];
        const result = req.roles.map((role: number) => rolesArray.includes(role)).find((val:boolean )=> val === true);
        console.log('VerifyRoles :',result);
        if (!result) return res.sendStatus(401);
        next();
    }
}


