export default class OfficeService {
    static formatOfficeName = (office) => {
        return office
            .toLowerCase()
            .replace(/ /g, '')
    }
}