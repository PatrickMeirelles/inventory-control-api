export interface IConsults {
    id: number;
    patientId: number;
    treatmentsId: number;
    consultDate: Date;
    finalConsultDate: Date;
    contactDate?: Date;
    contacted?: boolean;
}